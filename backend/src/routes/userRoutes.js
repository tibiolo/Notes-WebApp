import express from 'express';
import { registerUser } from '../controllers/userController.js';
import {
  registerValidation,
  handleValidation,
} from '../middleware/userValidation.js';

// Initializing express router
const router = express.Router();

// Setting up a register user route
router.post('/register', registerValidation, handleValidation, registerUser);

export default router;
