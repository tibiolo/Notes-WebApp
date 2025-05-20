// Importing PostgreSQL connection pool
import pool from './config/db.js';

// Getting notes by user id
const getNotes = async (user_id) => {
  const result = await pool.query(`SELECT * FROM notes WHERE user_id == $1`, [
    user_id,
  ]);
  return result.rows[0];
};

// Saving notes
const saveNote = async (user_id, title, context, pinned) => {
  const result = await pool.query(
    `INSERT INTO notes (user_id, title, context, pinned)`,
    [user_id, title, context, pinned]
  );
};

module.exports = {
  getNotes,
  saveNote,
};
