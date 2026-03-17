const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
const config = require('./config');

const log = (msg) => {
    console.log(msg);
    fs.appendFileSync('db_debug.txt', msg + '\n');
};

log("Testing MongoDB Connection...");
log("URL: " + config.MONGOBD_URL);

mongoose.connect(config.MONGOBD_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
})
    .then(() => {
        log("SUCCESS: MongoDB Connected!");
        process.exit(0);
    })
    .catch((err) => {
        log("ERROR: Failed to connect to MongoDB.");
        log("Name: " + err.name);
        log("Message: " + err.message);
        if (err.cause) log("Cause: " + JSON.stringify(err.cause));
        process.exit(1);
    });
