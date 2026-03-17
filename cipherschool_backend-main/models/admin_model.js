const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const AdminModel = mongoose.model("AdminModel", adminSchema);

module.exports = AdminModel;
