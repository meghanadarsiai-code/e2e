const mongoose = require("mongoose");
const UserModel = require("./models/user_model");
require("dotenv").config();

// Use the same URL as the app
const config = require("./config");
const MONGODB_URL = config.MONGOBD_URL;

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Connected to Database...");

        const users = await UserModel.find({});
        console.log(`Found ${users.length} users:`);
        users.forEach(u => {
            console.log(`- ${u.fullName} (${u.email})`);
        });

        process.exit(0);
    })
    .catch(err => {
        console.error("Error:", err);
        process.exit(1);
    });
