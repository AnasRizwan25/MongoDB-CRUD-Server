import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './user.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Hello from Vercel Serverless!');
});

export default app; // Important for Vercel to pick up the serverless function
