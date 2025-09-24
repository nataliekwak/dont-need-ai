import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './db/connectDB.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json()); // Middleware to parse JSON request bodies

app.use(cookieParser()); // Middleware to parse cookies

app.use('/api/auth', authRoutes);

// Start the backend server
app.listen(PORT, () => {
    connectDB(); // Connect to the MongoDB database
    console.log(`Server is running on port ${PORT}`);
});