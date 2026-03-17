const mongoose = require("mongoose");
const UserModel = require("./models/user_model");
const bcryptjs = require("bcryptjs");
require("dotenv").config();

const config = require("./config");
const MONGODB_URL = config.MONGOBD_URL;

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Connected to Database...");

        const email = "test@example.com";
        const password = "password123";

        // Check if exists
        const exists = await UserModel.findOne({ email });
        if (exists) {
            console.log("Test user already exists.");
            process.exit(0);
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = new UserModel({
            fullName: "Test User",
            email: email,
            password: hashedPassword,
            street: "123 Test St",
            homeAddress: "Test City",
            state: "Test State",
            country: "Test Country"
        });

        await user.save();
        console.log("Test user created successfully!");
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

        process.exit(0);
    })
    .catch(err => {
        console.error("Error:", err);
        process.exit(1);
    });
