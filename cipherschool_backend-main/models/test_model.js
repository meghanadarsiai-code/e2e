const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        default: "Medium",
    },
    duration: {
        type: String, // e.g., "60 Mins"
        required: true,
    },
    questions: [
        {
            type: {
                type: String,
                enum: ["MCQ", "Fill-in-the-blank", "Descriptive"],
                default: "MCQ",
            },
            question: String,
            options: [String], // Array of possible answers (for MCQ)
            answer: String,    // The exact string/keyword for auto-grading
        },
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
    },
}, { timestamps: true });

module.exports = mongoose.model("TestModel", testSchema);
