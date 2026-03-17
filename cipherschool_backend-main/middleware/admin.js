module.exports = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.userType === "admin")) {
    return next();
  }

  return res
    .status(403)
    .json({ error: "Access denied. Admin privileges required." });
};
