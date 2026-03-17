const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const UserModel = require("../models/user_model");
const AdminModel = require("../models/admin_model");

const protectedRoute = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Please provide a valid Bearer token in the Authorization header",
    });
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);

    if (global.MOCK_DB) {
      req.user = {
        _id: payload._id || "mock-id-123",
        fullName: "Mock User",
        email: "mock@test.com",
        role: payload.role || "student",
      };
      req.userType = req.user.role === "admin" ? "admin" : "user";
      return next();
    }

    if (payload.role === "admin") {
      const admin = await AdminModel.findById(payload._id).select("-password");
      if (!admin) {
        return res.status(401).json({ error: "Invalid admin token" });
      }
      req.user = { ...admin.toObject(), role: "admin" };
      req.userType = "admin";
      return next();
    }

    const dbUser = await UserModel.findById(payload._id).select("-password");
    if (!dbUser) {
      return res.status(401).json({ error: "Invalid user token" });
    }

    req.user = dbUser;
    req.userType = "user";
    next();
  } catch (error) {
    return res.status(401).json({ error: "User not logged in" });
  }
};

module.exports = protectedRoute;
