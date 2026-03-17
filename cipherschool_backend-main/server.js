const fs = require('fs');
const dns = require('dns');
try { dns.setDefaultResultOrder('ipv4first'); } catch (e) { }
const log = (msg) => { try { fs.appendFileSync('startup.log', msg + '\n'); } catch (e) { } };

log('Starting imports...');
const express = require("express");
log('Imported express');
const cors = require("cors");
log('Imported cors');
const dotenv = require("dotenv");
log('Imported dotenv');
const config = require("./config");
log('Imported config');
const mongoose = require("mongoose");
log('Imported mongoose');

// connect to MongoDB using config.MONGOBD_URL
const connectDB = async () => {
	try {
		log('Attempting to connect to DB...');
		await mongoose.connect(config.MONGOBD_URL, {
			serverSelectionTimeoutMS: 5000, // Timeout quick for dev
			family: 4
		});
		log("MongoDB connected");
		console.log("MongoDB connected");
	} catch (err) {
		log("Failed to connect to MongoDB: " + err.message);
		console.error("Failed to connect to MongoDB. Switching to MOCK MODE.");
		global.MOCK_DB = true;
	}
};
const fileUpload = require("express-fileupload");
log('Imported fileUpload');
const path = require("path");
log('Imported path');

dotenv.config();
log('Configured dotenv');
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload());

// serve uploaded files (certificates)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// feature routes (courses, chats, tests, certificate)
try {
	// log('Importing features_route');
	// app.use("/api/features", require("./routes/features_route")); // Replaced with separate MongoDB routes
	// log('Imported features_route');

	log('Importing granular feature routes');
	app.use("/api/course", require("./routes/courses_route"));
	app.use("/api/test", require("./routes/tests_route")); // New Test Route
	app.use("/api/assignment", require("./routes/assignments_route")); // New Assignment Route
	app.use("/api/chat", require("./routes/chat_route")); // Preserved Chat
	app.use("/api/certificate", require("./routes/certificate_route")); // Ported Certificate
	log('Imported granular feature routes');
} catch (e) { log("Error importing feature routes: " + e.message); }

connectDB();

// existing routes
try {
	log('Importing file_route');
	app.use("/api/file", require("./routes/file_route"));
	log('Imported file_route');
} catch (e) { log("Error importing file_route: " + e.message); }

try {
	log('Importing user_route');
	app.use("/api/user", require("./routes/user_route"));
	log('Imported user_route');

	log('Importing admin_route');
	app.use("/api/admin", require("./routes/admin_route"));
	log('Imported admin_route');
} catch (e) { log("Error importing user_route: " + e.message); }

// listen
try {
	const PORT = process.env.PORT || 4000;
	log('Starting server on port ' + PORT);
	const server = app.listen(PORT, '0.0.0.0', () => {
		log(`Server running on port ${PORT}`);
		console.log(`Server running on port ${PORT}`);
	});
	server.on('error', (e) => {
		log('Server runtime error: ' + e.message);
		console.error('Server runtime error:', e);
		process.exit(1);
	});

	// Debug: Keep alive
	setInterval(() => { }, 1000);

	process.on('exit', (code) => {
		log(`Process exiting with code: ${code}`);
		console.log(`Process exiting with code: ${code}`);
	});

	process.on('uncaughtException', (err) => {
		log(`Uncaught Exception: ${err.message}`);
		console.error(`Uncaught Exception:`, err);
	});

} catch (e) { log("Error starting server: " + e.message); }
