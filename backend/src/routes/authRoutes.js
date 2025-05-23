import express from 'express';
import { loginUser, logoutUser } from '../controllers/authController.js';
import {
  authValidation,
  handleValidation,
} from '../middleware/authValidation.js';

// Initializing express router
const router = express.Router();

// Setting up a login user route
router.post('/login', authValidation, handleValidation, loginUser);

// Setting up a logout route
router.post('/logout', logoutUser);

export default router;
