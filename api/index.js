import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./user.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/users", userRoute);

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("MongoDB connected!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

// Immediately connect to DB when function cold-starts
await connectDB();

app.get("/", (req, res) => {
  res.send("Hello from Vercel Serverless!");
});

// Export Express app as default
export default app;
