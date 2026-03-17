const mongoose = require("mongoose");
require("dotenv").config();
const { MONGOBD_URL } = require("./config");
const UserModel = require("./models/user_model");

const removeAdmin = async () => {
    try {
        console.log("Connecting to Database...");
        await mongoose.connect(MONGOBD_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4
        });
        console.log("Database Connected.");

        const email = "admin@cipherschools.com";

        const result = await UserModel.deleteOne({ email });

        if (result.deletedCount > 0) {
            console.log(`User ${email} has been removed successfully.`);
        } else {
            console.log(`User ${email} was not found.`);
        }

        process.exit(0);
    } catch (error) {
        console.error("Error removing admin:", error);
        process.exit(1);
    }
};

removeAdmin();
