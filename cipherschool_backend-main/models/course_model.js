const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
  },
  duration: {
    type: String,
    default: "4 weeks",
  },
  thumbnail: {
    type: String,
    default: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500",
  },
  instructor: {
    type: String,
    default: "CipherSchool Team",
  },
  enrolledUsers: [
    {
      type: ObjectId,
      ref: "UserModel",
    },
  ],
  modules: [
    {
      moduleNumber: Number,
      title: String,
      content: String,
      videoUrl: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const CourseModel = mongoose.model("CourseModel", courseSchema);

module.exports = CourseModel;
