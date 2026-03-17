const express = require("express");
const router = express.Router();
const AssignmentModel = require("../models/assignment_model");
const protectedRoute = require("../middleware/protectedResource");
const adminMiddleware = require("../middleware/admin");

// Get all assignments (Public/Students)
router.get("/assignments", async (req, res) => {
    try {
        const assignments = await AssignmentModel.find();
        res.json(assignments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch assignments" });
    }
});

// Create an assignment (Admin)
router.post("/assignments", protectedRoute, adminMiddleware, async (req, res) => {
    try {
        const assignment = new AssignmentModel({ ...req.body, author: req.user._id });
        await assignment.save();
        res.status(201).json({ message: "Assignment created successfully", assignment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create assignment" });
    }
});

// Update an assignment (Admin)
router.put("/assignments/:id", protectedRoute, adminMiddleware, async (req, res) => {
    try {
        const assignment = await AssignmentModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!assignment) return res.status(404).json({ error: "Assignment not found" });
        res.json({ message: "Assignment updated successfully", assignment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update assignment" });
    }
});

// Delete an assignment (Admin)
router.delete("/assignments/:id", protectedRoute, adminMiddleware, async (req, res) => {
    try {
        const assignment = await AssignmentModel.findByIdAndDelete(req.params.id);
        if (!assignment) return res.status(404).json({ error: "Assignment not found" });
        res.json({ message: "Assignment deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete assignment" });
    }
});

module.exports = router;
