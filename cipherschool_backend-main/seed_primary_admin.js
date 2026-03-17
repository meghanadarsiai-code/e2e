const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs"); // Fixed import
require("dotenv").config();
const { MONGOBD_URL } = require("./config");
const UserModel = require("./models/user_model");

const seedAdmin = async () => {
    try {
        console.log("Connecting to Database...");
        await mongoose.connect(MONGOBD_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4
        });
        console.log("Database Connected.");

        const email = "admin@cipherschools.com";

        // Find existing user or create new one
        let user = await UserModel.findOne({ email });

        if (user) {
            console.log(`User ${email} found. Updating role to Admin...`);
            user.role = "admin";
            await user.save();
            console.log("Role updated successfully.");
        } else {
            console.log(`User ${email} not found. Creating new Admin user...`);
            const hashedPassword = await bcryptjs.hash("admin123", 10);

            user = new UserModel({
                fullName: "Cipher Admin",
                email: email,
                password: hashedPassword,
                role: "admin",
                street: "Admin HQ",
                homeAddress: "Cipher Schools Office",
                state: "Global",
                country: "Internet",
                profileImg: "https://ui-avatars.com/api/?name=Cipher+Admin&background=0D8ABC&color=fff"
            });

            await user.save();
            console.log(`Admin user created successfully with password: 'admin123'`);
        }

        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
};

seedAdmin();
