import uploadOnCloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName: fullName,
      email: email,
      password: hashPassword,
    });
    if (newUser) {
      const token=generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        success: true,
        message: "account created successfully",
        user: {
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        },
        token:token
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid user data",
      });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token=generateToken(user._id, res);
    res.status(200).json({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
      token:token
    });
  } catch (error) {
    console.log("Error in login Controller", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const logout = async (req, res) => {
  res.cookie("chatty", "", { maxAge: 0 });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const updateProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile pic is required",
      });
    }
    const user = req.user;
    const uploadResponse = await uploadOnCloudinary(
      req.file.path,
      user.public_id
    );
    if (!uploadResponse.success)
      return res.status(400).json({
        success: false,
        message: "Profile pic is required",
      });
      const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        profilePic: uploadResponse.imageUrl,
        public_id: uploadResponse.publicId,
      },
      { new: true }
    ).select('-password');
    res.status(200).json({
      success: true,
      message: "profile update succefully",
      user: updatedUser,
      token:req.token,
    });
  } catch (error) {
    console.log("error in update profile :", error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Auth is loggedIn!",
      user: req.user,
      token:req.token,
    });
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
  }
};
