// Importing PostgreSQL connection pool
import pool from '../config/db.js';

// Getting notes by user id
export const getNotes = async (user_id) => {
  const result = await pool.query(
    `SELECT n.note_id,n.title, n.content, n.pinned, n.created_at,
      json_agg(t.name) AS tags FROM notes n LEFT JOIN note_tags nt ON n.note_id = nt.note_id LEFT JOIN tags t ON nt.tag_id = t.tag_id WHERE n.user_id = $1 GROUP BY n.note_id `,
    [user_id]
  );
  return result.rows;
};

// Saving notes
export const saveNote = async (user_id, title, content, pinned, tags = []) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const notesRes = await client.query(
      `INSERT INTO notes (user_id, title, content, pinned) VALUES ($1, $2 , $3, $4) RETURNING note_id`,
      [user_id, title, content, pinned]
    );

    const note_id = notesRes.rows[0].note_id;

    for (const tagName of tags) {
      const tagRes = await client.query(
        `INSERT INTO tags (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING tag_id`,
        [tagName]
      );

      const tag_id = tagRes.rows[0].tag_id;

      await client.query(
        `INSERT INTO note_tags (note_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [note_id, tag_id]
      );
    }

    await client.query(`COMMIT`);
    return { note_id };
  } catch (err) {
    await client.query(`ROLLBACK`);
    throw err;
  } finally {
    client.release();
  }
};

// Pinning notes
export const updatePinNote = async (user_id, note_id, pinned) => {
  const result = await pool.query(
    `UPDATE notes SET pinned = $1 WHERE note_id = $2 AND user_id = $3 RETURNING pinned`,
    [pinned, note_id, user_id]
  );
  return result.rows[0];
};

// Edit notes
export const editNote = async (user_id, note_id, title, content, tags = []) => {
  const client = await pool.connect();

  try {
    await client.query(`BEGIN`);

    await client.query(
      `UPDATE notes SET title = $1, content = $2 WHERE note_id = $3 AND user_id = $4`,
      [title, content, note_id, user_id]
    );

    await client.query(`DELETE FROM note_tags WHERE note_id = $1`, [note_id]);

    for (const tagName of tags) {
      const tagRes = await client.query(
        `INSERT INTO tags (name) VALUES ($1) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING tag_id`,
        [tagName]
      );

      const tag_id = tagRes.rows[0].tag_id;

      await client.query(
        `INSERT INTO note_tags (note_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [note_id, tag_id]
      );
    }

    await client.query(`COMMIT`);
    return { note_id, title, content, tags };
  } catch (err) {
    await client.query(`ROLLBACK`);
    throw err;
  } finally {
    client.release();
  }
};

// Delete notes
export const deleteNote = async (user_id, note_id) => {
  const result = await pool.query(
    `DELETE FROM notes WHERE note_id = $1 AND user_id = $2 RETURNING *`,
    [note_id, user_id]
  );
  return result.rows[0];
};

// Search notes
export const searchNote = async (user_id, query) => {
  const result = await pool.query(
    `SELECT n.note_id, n.title, n.content, n.pinned, n.created_at,
      json_agg(t.name) AS tags
     FROM notes n
     LEFT JOIN note_tags nt ON n.note_id = nt.note_id
     LEFT JOIN tags t ON nt.tag_id = t.tag_id
     WHERE n.user_id = $1 AND (
       n.title ILIKE $2 OR
       n.content ILIKE $2 OR
       t.name ILIKE $2
     )
     GROUP BY n.note_id
     ORDER BY n.created_at DESC`,
    [user_id, `%${query.trim()}%`]
  );
  return result.rows;
};
