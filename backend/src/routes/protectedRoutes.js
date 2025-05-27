import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import {
  editNoteControl,
  deleteNoteControl,
  updateNotePinControl,
  createNoteControl,
  fetchNotesControl,
  searchNoteControl,
} from '../controllers/noteController.js';
import {
  validateNote,
  validatePin,
  handleValidation,
  validateNoteId,
  validateNoteSearch,
} from '../middleware/noteValidation.js';

// Initializing express router
const router = express.Router();

// Setting up a authenticate user route
router.get('/auth', verifyToken, (req, res) => {
  res.json({
    message: `Authenticated, ${req.user.email}`,
    username: req.user.username,
  });
});

// Setting up get notes route
router.get('/notes', verifyToken, fetchNotesControl);

// Setting up saving notes
router.post(
  '/notes',
  verifyToken,
  validateNote,
  handleValidation,
  createNoteControl
);

// Searching for notes route
router.post(
  '/notes/search',
  verifyToken,
  validateNoteSearch,
  handleValidation,
  searchNoteControl
);

// Setting up pining notes
router.patch(
  '/notes',
  verifyToken,
  validatePin,
  handleValidation,
  updateNotePinControl
);

// Setting up editing notes route
router.patch(
  '/notes/edit',
  verifyToken,
  validateNote,
  handleValidation,
  editNoteControl
);

// Setting up deleting notes route
router.delete(
  '/notes',
  verifyToken,
  validateNoteId,
  handleValidation,
  deleteNoteControl
);

export default router;
