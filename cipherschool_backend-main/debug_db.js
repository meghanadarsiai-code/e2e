const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

console.log("Starting diagnostic...");

try {
    console.log("Attempting to connect to MongoDB...");
    console.log("URL:", config.MONGOBD_URL); // CAREFUL: This prints credentials

    mongoose.connect(config.MONGOBD_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("MongoDB connected successfully!");
        process.exit(0);
    }).catch((err) => {
        console.error("MongoDB connection failed:");
        console.error(err);
        process.exit(1);
    });
} catch (e) {
    console.error("Sync error:", e);
}
