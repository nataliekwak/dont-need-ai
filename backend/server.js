import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './src/routes/authRoutes.js';
import writingGuideRoutes from './src/routes/writingGuideRoutes.js';
import { connectDB } from './src/db/connectDB.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const allowedOrigins = [process.env.FRONTEND_URL, 'https://www.dontneedai.com'];

// Enable CORS
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Trust proxy for secure cookies behind a proxy (like Render)
app.set('trust proxy', 1);

app.use(express.json()); // Middleware to parse JSON request bodies

app.use(cookieParser()); // Middleware to parse cookies

app.use('/api/auth', authRoutes);

app.use('/api/writing-guide', writingGuideRoutes);

// Start the backend server
app.listen(PORT, () => {
    connectDB(); // Connect to the MongoDB database
    console.log(`Server is running on port ${PORT}`);
});