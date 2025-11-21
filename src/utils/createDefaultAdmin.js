import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin already exists");
      return;
    }
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const defaultAdmin = new User({
      username: "admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });
    if (!defaultAdmin) {
      console.log("Failed to create default admin");
      return;
    }
    await defaultAdmin.save();
    console.log({
      message: "Default admin created successfully",
      email: defaultAdmin.email,
    });
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};
