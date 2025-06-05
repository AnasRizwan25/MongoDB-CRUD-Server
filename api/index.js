import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from '../routes/user.js'; // Adjust the path as necessary

dotenv.config();

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URL);
  isConnected = true;
}

await connectDB();

app.get('/', (req, res) => {
  res.send('Hello from Vercel Serverless!');
});

export default app; // ✅ Required for Vercel
