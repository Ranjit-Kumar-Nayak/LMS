import { User } from "../models/user.schema.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
  console.log(req.body);
  
    if (!name || !email || !password) {
      console.log(name);
      
      return res.status(400).json({
        message: "All fields are required....",
        success: false,
      });
    }
    const user =await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "this user is already present",
        success: true,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      name,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to register",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isPasswordMatch = bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    generateToken(res, user, `welcome back ${user.name}`);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Failed to login",
      success: false,
    });
  }
};
