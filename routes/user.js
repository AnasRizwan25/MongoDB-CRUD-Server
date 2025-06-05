import express from "express";
import User from "../models/user.js";

const userRoute = express.Router();

userRoute.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      error: false,
      data: users,
    });
  } catch (error) {
    res.status(200).json({
      error: true,
      data: error.message,
    });
  }
});

userRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (user) {
      return res.status(200).json({
        error: false,
        message: "User found",
        data: user,
      });
    } else {
      return res.status(404).json({
        error: true,
        message: "User not found",
        data: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Server error",
      data: null,
    });
  }
});


userRoute.post("/", async (req, res) => {
  try {
    let data = req.body;
    let newUser = new User({ ...data });
    newUser = await newUser.save();
    res.status(200).json({
      error: false,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    res.status(201).json({
      error: true,
      message: error.message,
      data: null,
    });
  }
});

userRoute.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({
      error: false,
      message: "User deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      error: true,
      message: "User not found",
      data: null,
    });
  }
});

userRoute.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const user = await User.findByIdAndUpdate(id, {
      ...updatedData,
    });
    res.status(200).json({
      error: false,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
      data: null,
    });
  }
});

export default userRoute;
