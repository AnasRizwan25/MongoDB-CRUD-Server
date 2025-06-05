import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from '../user.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

// Connect to MongoDB (only connect once)
let isConnected = false;

async function connectToMongo() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected!");
    isConnected = true;
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

await connectToMongo();

app.get('/', (req, res) => {
  res.send('Hello from Vercel Serverless Function!');
});

// Export the handler for Vercel
export default app;
