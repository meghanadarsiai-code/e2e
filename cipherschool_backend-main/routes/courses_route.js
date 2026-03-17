const Enrollment = require("../models/Enrollment");
const express = require("express");
const router = express.Router();
const CourseModel = require("../models/course_model");
const protectedRoute = require("../middleware/protectedResource");

const adminMiddleware = require("../middleware/admin");


// other course routes above...

router.post("/enroll/:courseId", async (req, res) => {
  try {
    const { userId } = req.body;
    const { courseId } = req.params;

    const enrollment = new Enrollment({
      userId,
      courseId,
    });

    await enrollment.save();

    const course = await Course.findById(courseId);

    res.status(200).json({
      message: "Enrolled successfully",
      materials: course.materials,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// THIS MUST BE LAST LINE

// Get all courses
router.get("/courses", async (req, res) => {
  try {
    const courses = await CourseModel.find().select("-modules");
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
});

// Get single course with full content
router.get("/courses/:id", async (req, res) => {
  try {
    const course = await CourseModel.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    res.status(500).json({ error: "Failed to fetch course" });
  }
});

// Enroll in a course (User only)
router.post("/courses/:id/enroll", protectedRoute, async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user._id;

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if already enrolled
    if (course.enrolledUsers.includes(userId)) {
      return res.status(400).json({ error: "Already enrolled in this course" });
    }

    course.enrolledUsers.push(userId);
    await course.save();

    res.status(200).json({ message: "Successfully enrolled in course", course });
  } catch (error) {
    console.error("Error enrolling in course:", error);
    res.status(500).json({ error: "Failed to enroll in course" });
  }
});

// Get user's enrolled courses
router.get("/my-courses", protectedRoute, async (req, res) => {
  try {
    const userId = req.user._id;
    const courses = await CourseModel.find({ enrolledUsers: userId });
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ error: "Failed to fetch enrolled courses" });
  }
});

// Create a new course (Admin only)
router.post("/courses", protectedRoute, adminMiddleware, async (req, res) => {
  try {
    const course = new CourseModel({ ...req.body, author: req.user._id });
    await course.save();
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ error: "Failed to create course" });
  }
});

// Update a course (Admin only)
router.put("/courses/:id", protectedRoute, adminMiddleware, async (req, res) => {
  try {
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Failed to update course" });
  }
});

// Delete a course (Admin only)
router.delete("/courses/:id", protectedRoute, adminMiddleware, async (req, res) => {
  try {
    const course = await CourseModel.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Failed to delete course" });
  }
});

module.exports = router;

