import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import protectedRoutes from './routes/protectedRoutes.js';

// Loading environment variables
dotenv.config();

// Initializing App
const app = express();

// Parsing JSON data
app.use(express.json());

// Parsing cookies
app.use(cookieParser());

// Security Headers
app.use(helmet());

// Allowing CrossOrigin requests for frontend
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

// Initializing user routes
app.use('/api/users', userRoutes);

// Initializing auth routes
app.use('/api/users', authRoutes);

// Initializing protected routes
app.use('/api/users', protectedRoutes);

export default app;
