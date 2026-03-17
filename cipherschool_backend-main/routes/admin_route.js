const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AdminModel = require("../models/admin_model");
const { JWT_SECRET } = require("../config");

// Admin Signup
router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Please enter all mandatory fields" });
    }

    if (global.MOCK_DB) {
        return res.status(201).json({ result: "Admin signed up successfully (Mock)" });
    }

    try {
        const adminInDB = await AdminModel.findOne({ email });
        if (adminInDB) {
            return res.status(500).json({ error: "Admin with this email already exists" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const admin = new AdminModel({
            email,
            password: hashedPassword,
        });

        await admin.save();
        res.status(201).json({ result: "Admin signed up successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Admin Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Please enter all mandatory fields" });
    }

    if (global.MOCK_DB) {
        const jwtToken = jwt.sign({ _id: "mock-admin-id-123", role: "admin" }, JWT_SECRET);
        return res.status(200).json({
            result: {
                token: jwtToken,
                user: {
                    _id: "mock-admin-id-123",
                    email,
                    role: "admin",
                },
            },
        });
    }

    try {
        const adminInDB = await AdminModel.findOne({ email });
        if (!adminInDB) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        const didMatch = await bcryptjs.compare(password, adminInDB.password);
        if (didMatch) {
            const jwtToken = jwt.sign({ _id: adminInDB._id, role: "admin" }, JWT_SECRET);
            const adminInfo = {
                _id: adminInDB._id,
                email: adminInDB.email,
                role: "admin",
            };

            res.status(200).json({ result: { token: jwtToken, user: adminInfo } });
        } else {
            res.status(401).json({ error: "Invalid Credentials" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
