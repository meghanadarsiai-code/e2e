const mongoose = require("mongoose");

const testAttemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
      index: true,
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestModel",
      required: true,
      index: true,
    },
    correct: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    percent: {
      type: Number,
      required: true,
      default: 0,
    },
    passed: {
      type: Boolean,
      required: true,
      default: false,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

testAttemptSchema.index({ user: 1, test: 1 }, { unique: true });

module.exports = mongoose.model("TestAttemptModel", testAttemptSchema);
