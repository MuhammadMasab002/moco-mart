const verifyAdmin = (req, res, next) => {
  try {
    const user = req.user.role;
    console.log("req.user.role--->", req.user.role);
    if (user && user === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ success: false, message: "Admin access required" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export { verifyAdmin };
