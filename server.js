import express from 'express'
import mongoose from 'mongoose';
import 'dotenv/config'
import users from './route/user.js';


// Importing necessary modules
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use('/users', users);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(()=>{
   console.log('mongodb connected!')
}).catch((err)=>{
   console.error('error in mongodb connection!:',err)
});


// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello World!')
});


// Start the server
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
});