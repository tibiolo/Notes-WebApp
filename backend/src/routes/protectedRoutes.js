import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

// Initializing express router
const router = express.Router();

// Setting up a login user route
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.email}, you're authenitcated!` });
});

export default router;
