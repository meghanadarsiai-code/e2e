const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true,
    },
    course: {
        type: String, // Or ObjectId if linking to CourseModel
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AdminModel",
    },
}, { timestamps: true });

module.exports = mongoose.model("CertificateModel", certificateSchema);
