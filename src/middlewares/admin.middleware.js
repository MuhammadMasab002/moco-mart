export const verifyAdmin = (req, res, next) => {
  try {
    const role = req.user?.role;
    if (role && role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Admin access required" });
    }
    next();
    
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};
