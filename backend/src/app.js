import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes.js';

// Loading environment variables
dotenv.config();

// Initializing App
const app = express();

// Parsing JSON data
app.use(express.json());

// Security Headers
app.use(helmet());

// Initializing user routes
app.use('/api/users', userRoutes);

export default app;
