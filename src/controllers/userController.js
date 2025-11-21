import { User } from "../models/user.models.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    // if (!userId) {
    //    throw new Error("User ID is required to generate token");
    // }

    const accessToken = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
    const refreshToken = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    });

    const user = await User.findById(userId);
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const checkUserExist = await User.findOne({ email });
    if (checkUserExist) {
      return res
        .status(409)
        .json({ success: false, message: "User already exist!!" });
    }

    // Hash the password before saving
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();

    const userResponse = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: userResponse,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials!" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      existingUser._id
    );
    // method 1
    // const loggedInUser = await User.findById(existingUser._id).select(
    //   "-password -refreshToken"
    // );
    // method 2
    const userResponse = {
      _id: existingUser._id,
      username: existingUser.username,
      email: existingUser.email,
      accessToken,
    };
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        success: true,
        message: "Login successful!",
        user: userResponse,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

export { registerUser, loginUser };
