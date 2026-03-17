const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const CertificateModel = require("../models/certificate_model");
const UserModel = require("../models/user_model");
const CourseModel = require("../models/course_model");
const TestModel = require("../models/test_model");
const TestAttemptModel = require("../models/test_attempt_model");
const protectedRoute = require("../middleware/protectedResource");
const adminMiddleware = require("../middleware/admin");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

router.post("/issue/:userId", protectedRoute, adminMiddleware, async (req, res) => {
    try {
        const { userId } = req.params;
        const requestedCourseLabel = req.body?.course;

        const user = await UserModel.findById(userId).select("fullName email role");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.role === "admin") {
            return res.status(400).json({ error: "Certificates are issued only to students" });
        }

        // Relaxing test requirements so admins can manually issue certificates
        const passedTestIds = await TestAttemptModel.distinct("test", {
            user: user._id,
            passed: true,
        });

        const passedTestsCount = passedTestIds.length;

        const attempts = await TestAttemptModel.find({ user: user._id, passed: true }).select("percent");
        const averageScore = attempts.length
            ? Math.round(attempts.reduce((acc, item) => acc + (item.percent || 0), 0) / attempts.length)
            : 0;

        const name = user.fullName || user.email;
        const course = requestedCourseLabel || "Program Completion";
        const score = averageScore;

        if (!name || !course || !score) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const doc = new PDFDocument({
            layout: 'landscape',
            size: 'A4',
        });

        const fileName = `${name.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}_certificate.pdf`;
        const filePath = path.join(uploadDir, fileName);
        const writeStream = fs.createWriteStream(filePath);

        doc.pipe(writeStream);

        // Styling
        doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f0f0f0');
        doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).strokeColor('#2e86de').lineWidth(5).stroke();

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

        writeStream.on('finish', async () => {
            const url = `/uploads/${fileName}`;
            const cert = new CertificateModel({
                user: user._id,
                course,
                score,
                url,
                issuedBy: req.user._id,
            });
            await cert.save();
            res.json({
                success: true,
                url,
                certificate: cert,
                eligibility: {
                    passedTestsCount: passedTestsCount,
                },
            });
        });

        writeStream.on('error', (err) => {
            console.error("PDF Generation Error:", err);
            res.status(500).json({ success: false, message: "Could not generate certificate" });
        });

    } catch (error) {
        console.error("Certificate error:", error);
        res.status(500).json({ error: "Certificate generation failure" });
    }
});

router.get("/my-certificates", protectedRoute, async (req, res) => {
    try {
        const userId = req.user._id;
        const certificates = await CertificateModel.find({ user: userId }).sort({ createdAt: -1 });
        res.json(certificates);
    } catch (error) {
        console.error("Fetch certificates error:", error);
        res.status(500).json({ error: "Failed to fetch certificates" });
    }
});

module.exports = router;
