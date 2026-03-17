const express = require("express");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();
const protectedRoute = require("../middleware/protectedResource");
const adminRoute = require("../middleware/admin");

const dataDir = path.join(__dirname, "../data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const readJSON = (file) => {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) return [];
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return [];
  }
};

const writeJSON = (file, data) => {
  try {
    fs.writeFileSync(path.join(dataDir, file), JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Error writing ${file}:`, err);
  }
};

// --- GEMINI SETUP ---
// Access API key from environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY_HERE");

// 📘 Courses
router.get("/courses", (req, res) => {
  res.json(readJSON("courses.json"));
});

router.post("/courses", protectedRoute, adminRoute, (req, res) => {
  const courses = readJSON("courses.json");
  const newCourse = { id: Date.now(), ...req.body };
  courses.push(newCourse);
  writeJSON("courses.json", courses);
  res.json({ success: true, course: newCourse });
});

// 💬 Chat
router.get("/chats", (req, res) => {
  res.json(readJSON("chats.json"));
});

router.post("/chats", async (req, res) => {
  const chats = readJSON("chats.json");
  const newMsg = { id: Date.now(), ...req.body };
  chats.push(newMsg);
  writeJSON("chats.json", chats);

  let botReply = "I'm thinking...";
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
    });

    // Add system context manually to the prompt if needed
    const systemPrompt = "You are an AI assistant for CipherSchools. Answer concisely.";
    const fullPrompt = `${systemPrompt}\n\nUser: ${newMsg.text}`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    botReply = response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);

    // Fallback logic if API fails or key is missing
    const textLower = (newMsg.text || "").toLowerCase();
    if (textLower.includes("hi") || textLower.includes("hello")) {
      botReply = "Hi! I'm your AI study assistant. Ask me anything!";
    } else if (error.message.includes("429")) {
      botReply = "I'm currently overloaded with requests (Quota Exceeded). Please try again in a minute.";
    } else {
      botReply = "I'm having trouble connecting to my brain (Gemini API). Please check the server logs or API key.";
    }
  }

  const botMsg = { id: Date.now() + 1, sender: "Gemini", text: botReply };
  chats.push(botMsg);
  writeJSON("chats.json", chats);
  res.json({ success: true, msg: newMsg, bot: botMsg });
});

router.delete("/chats", (req, res) => {
  writeJSON("chats.json", []);
  res.json({ success: true, message: "Chat history cleared" });
});

// 🧮 Tests
router.get("/tests", (req, res) => {
  res.json(readJSON("tests.json"));
});

router.post("/tests", protectedRoute, adminRoute, (req, res) => {
  const tests = readJSON("tests.json");
  const newTest = { id: Date.now(), ...req.body };
  tests.push(newTest);
  writeJSON("tests.json", tests);
  res.json({ success: true, test: newTest });
});

router.post("/submit-test/:id", (req, res) => {
  const tests = readJSON("tests.json");
  const test = tests.find(t => t.id == req.params.id);
  if (!test) return res.status(404).json({ message: "Test not found" });

  const answers = req.body.answers || [];
  let correctCount = 0;
  test.questions.forEach((q, i) => {
    // normalize to string comparison
    const given = (answers[i] || "").toString().trim();
    const expected = (q.correct || "").toString().trim();
    // Relaxed comparison
    if (given && expected && given.toLowerCase() === expected.toLowerCase()) correctCount++;
  });

  const total = test.questions.length || 1;
  const percent = Math.round((correctCount / total) * 100);
  const passed = percent >= 60;

  res.json({ success: true, totalQuestions: total, correct: correctCount, percent, passed });
});

// 🏆 Certificate generation (PDF)
// 🏆 Certificate generation (PDF)
router.post("/certificate", (req, res) => {
  const { name, course, score, userId } = req.body; // Added userId

  const doc = new PDFDocument({
    layout: 'landscape',
    size: 'A4',
  });

  const fileName = `${name.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}_certificate.pdf`;
  const filePath = path.join(uploadDir, fileName);
  const writeStream = fs.createWriteStream(filePath);

  doc.pipe(writeStream);

  // Background/Border
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f0f0f0');
  doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).strokeColor('#2e86de').lineWidth(5).stroke();

  // Content
  doc.fontSize(40).fillColor('#333').text('Certificate of Completion', 0, 100, { align: 'center' });
  doc.moveDown();
  doc.fontSize(20).text('This is to certify that', { align: 'center' });
  doc.moveDown();
  doc.fontSize(30).fillColor('#2e86de').text(name, { align: 'center' });
  doc.moveDown();
  doc.fontSize(20).fillColor('#333').text('has successfully completed the course', { align: 'center' });
  doc.moveDown();
  doc.fontSize(25).text(course, { align: 'center' });
  doc.moveDown();
  doc.fontSize(15).text(`Score: ${score}%`, { align: 'center' });
  doc.moveDown(2);
  doc.fontSize(12).text('CipherSchools Management', { align: 'center' });
  doc.text(new Date().toDateString(), { align: 'center' });

  doc.end();

  writeStream.on('finish', () => {
    const url = `/uploads/${fileName}`;

    // Save to certificates.json if userId is provided
    if (userId) {
      const certs = readJSON("certificates.json");
      const newCert = {
        id: Date.now(),
        userId,
        name,
        course,
        score,
        date: new Date().toISOString(),
        url
      };
      certs.push(newCert);
      writeJSON("certificates.json", certs);
    }

    res.json({ success: true, url });
  });

  writeStream.on('error', (err) => {
    console.error("PDF Generation Error:", err);
    res.status(500).json({ success: false, message: "Could not generate certificate" });
  });
});

router.get("/my-certificates/:userId", (req, res) => {
  const certs = readJSON("certificates.json");
  const userCerts = certs.filter(c => c.userId === req.params.userId).reverse();
  res.json(userCerts);
});

module.exports = router;
