import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  fetchNotes,
  createNote,
  updateNotePin,
} from '../controllers/noteController.js';
import {
  validateNote,
  validatePin,
  handleValidation,
} from '../middleware/noteValidation.js';

// Initializing express router
const router = express.Router();

// Setting up a login user route
router.get('/dashboard', verifyToken, (req, res) => {
  res.json({ message: `Hello ${req.user.email}, you're authenitcated!` });
});

// Setting up get notes route
router.get('/notes', verifyToken, fetchNotes);

// Setting up saving notes
router.post('/notes', verifyToken, validateNote, handleValidation, createNote);

// Setting up pinnging notes
router.patch(
  '/notes',
  verifyToken,
  validatePin,
  handleValidation,
  updateNotePin
);

export default router;
