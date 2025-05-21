import { body, validationResult } from 'express-validator';

export const validateNote = [
  body('title')
    .trim()
    .escape()
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),

  body('context')
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage('Context is required'),

  body('pinned').isBoolean().withMessage('Pinned must be true or false'),

  body('tags')
    .optional()
    .isArray({ max: 5 })
    .withMessage('Tags must be an array'),

  body('tags.*').isString().trim().escape().isLength({ min: 1, max: 50 }),

  body('user_id').not().exists().withMessage('Cannot manually set user_id'),
];

export const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
