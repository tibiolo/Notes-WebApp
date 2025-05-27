import { body, validationResult } from 'express-validator';

export const validateNote = [
  body('title')
    .trim()
    .escape()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),

  body('content')
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage('Content is required'),

  body('tags')
    .optional()
    .isArray({ max: 5 })
    .withMessage('Tags must be an array'),

  body('tags.*').isString().trim().escape().isLength({ min: 1, max: 50 }),

  body('user_id').not().exists().withMessage('Cannot manually set user_id'),
];

export const validatePin = [
  body('pinned').isBoolean().withMessage('Pinned must be true or false'),
];

export const validateNoteId = [
  body('note_id').isInt().withMessage('note_id needs to be a number'),
];

export const validateNoteSearch = [
  body('query')
    .trim()
    .escape()
    .isLength({ min: 1, max: 255 })
    .withMessage('query is required'),
];

export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
