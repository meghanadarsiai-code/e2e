const express = require("express");
const router = express.Router();
const TestModel = require("../models/test_model");
const TestAttemptModel = require("../models/test_attempt_model");
const protectedRoute = require("../middleware/protectedResource");
const adminMiddleware = require("../middleware/admin");

// Get all tests (Public, or maybe student?)
router.get("/tests", async (req, res) => {
    try {
        const tests = await TestModel.find();
        res.json(tests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch tests" });
    }
});

router.post("/tests/:id/submit", protectedRoute, async (req, res) => {
    try {
        if (req.userType !== "user") {
            return res.status(403).json({ error: "Only students can submit test answers" });
        }

        const { answers } = req.body;
        if (!Array.isArray(answers)) {
            return res.status(400).json({ error: "Answers must be an array" });
        }

        const test = await TestModel.findById(req.params.id);
        if (!test) {
            return res.status(404).json({ error: "Test not found" });
        }

        const questions = test.questions || [];
        if (!questions.length) {
            return res.status(400).json({ error: "Test has no questions" });
        }

        let correct = 0;

        questions.forEach((question, index) => {
            const type = question.type || "MCQ";
            const expected = (question.answer || "").toString().trim().toLowerCase();
            const received = (answers[index] || "").toString().trim().toLowerCase();

            if (type === "MCQ" || type === "Fill-in-the-blank") {
                if (expected && expected === received) {
                    correct += 1;
                }
            } else if (type === "Descriptive") {
                // For descriptive, we mark it correct if they provided ANY answer for now.
                // In a real app, this would require manual admin grading.
                if (received.length > 10) {
                    correct += 1;
                }
            }
        });

        const total = questions.length;
        const percent = Math.round((correct / total) * 100);
        const passed = percent >= 60;

        const attempt = await TestAttemptModel.findOneAndUpdate(
            { user: req.user._id, test: test._id },
            {
                $set: {
                    user: req.user._id,
                    test: test._id,
                    correct,
                    total,
                    percent,
                    passed,
                    submittedAt: new Date(),
                },
            },
            { upsert: true, new: true, runValidators: true }
        );

        res.status(200).json({
            message: "Test submitted successfully",
            result: {
                title: test.title,
                correct,
                total,
                percent,
                passed,
                timestamp: attempt.submittedAt,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to submit test" });
    }
});

// Create a test (Admin)
router.post("/tests", protectedRoute, adminMiddleware, async (req, res) => {
    try {
        const test = new TestModel({ ...req.body, author: req.user._id });
        await test.save();
        res.status(201).json({ message: "Test created successfully", test });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create test" });
    }
});

// Update a test (Admin)
router.put("/tests/:id", protectedRoute, adminMiddleware, async (req, res) => {
    try {
        const test = await TestModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!test) return res.status(404).json({ error: "Test not found" });
        res.json({ message: "Test updated successfully", test });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update test" });
    }
});

// Delete a test (Admin)
router.delete("/tests/:id", protectedRoute, adminMiddleware, async (req, res) => {
    try {
        const test = await TestModel.findByIdAndDelete(req.params.id);
        if (!test) return res.status(404).json({ error: "Test not found" });
        res.json({ message: "Test deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete test" });
    }
});

module.exports = router;
