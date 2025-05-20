import express from 'express';
import { loginUser } from '../controllers/authController.js';
import {
  authValidation,
  handleValidation,
} from '../middleware/authValidation.js';
import { verifyToken } from '../middleware/authMiddleware.js';

// Initializing express router
const router = express.Router();

// Setting up a login user route
router.post('/login', authValidation, handleValidation, loginUser);

export default router;
