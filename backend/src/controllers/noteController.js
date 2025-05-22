import {
  getNotes,
  saveNote,
  editNote,
  deleteNote,
  updatePinNote,
} from '../models/noteModel.js';

export const fetchNotesControl = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const result = await getNotes(user_id);

    return res.json(result);
  } catch (err) {
    console.error('Error fetching notes', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const createNoteControl = async (req, res) => {
  const { title, context, pinned, tags } = req.body;
  const user_id = req.user.user_id;

  try {
    const result = await saveNote(user_id, title, context, pinned, tags);

    return res.json(result);
  } catch (err) {
    console.error('Error creating note', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateNotePinControl = async (req, res) => {
  const { note_id, pinned } = req.body;
  const user_id = req.user.user_id;

  try {
    const result = await updatePinNote(user_id, note_id, pinned);

    return res.json(result);
  } catch (err) {
    console.error('Error editing note', err);
    res.status(500).json('Server error');
  }
};

export const editNoteControl = async (req, res) => {
  const { note_id, title, context, tags } = req.body;
  const user_id = req.user.user_id;

  try {
    const result = await editNote(user_id, note_id, title, context, tags);

    return res.json(result);
  } catch (err) {
    console.error('Error editing note', err);
    res.status(500).json('Server error');
  }
};

export const deleteNoteControl = async (req, res) => {
  const note_id = parseInt(req.body.note_id);

  const user_id = req.user.user_id;

  try {
    const result = await deleteNote(user_id, note_id);

    res.json(result);
  } catch (err) {
    console.error('Error deleting note', err);
    res.status(500).json('Server error');
  }
};
