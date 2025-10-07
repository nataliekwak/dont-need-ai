import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import writingGuideRoutes from './routes/writingGuideRoutes.js';
import { connectDB } from './db/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: "http://localhost:5173", credentials: true})); // Enable CORS

app.use(express.json()); // Middleware to parse JSON request bodies

app.use(cookieParser()); // Middleware to parse cookies

app.use('/api/auth', authRoutes);

app.use('/api/writing-guide', writingGuideRoutes);

// Start the backend server
app.listen(PORT, () => {
    connectDB(); // Connect to the MongoDB database
    console.log(`Server is running on port ${PORT}`);
});