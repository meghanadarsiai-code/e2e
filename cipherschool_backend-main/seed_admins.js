const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const AdminModel = require("./models/admin_model");
const config = require("./config");

const adminsToSeed = [
    { email: "admin@cipherschools.com", password: "admin@123" },
    { email: "manager@cipherschools.com", password: "manager@123" },
    { email: "support@cipherschools.com", password: "support@123" }
];

const seedAdmins = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(config.MONGOBD_URL, {
            family: 4
        });
        console.log("Connected to MongoDB.");

        for (const admin of adminsToSeed) {
            const existing = await AdminModel.findOne({ email: admin.email });
            if (existing) {
                console.log(`Admin ${admin.email} already exists.`);
            } else {
                const hashedPassword = await bcryptjs.hash(admin.password, 10);
                const newAdmin = new AdminModel({
                    email: admin.email,
                    password: hashedPassword
                });
                await newAdmin.save();
                console.log(`Created admin: ${admin.email}`);
            }
        }

        console.log("Seeding complete.");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding admins:", error);
        process.exit(1);
    }
};

seedAdmins();
