// Importing PostgreSQL connection pool
import pool from '../config/db.js';

// Creating a new user
export const createUser = async (username, email, hashedPassword) => {
  const result = await pool.query(
    `INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, username, email`,
    [username, email, hashedPassword]
  );
  return result.rows[0];
};

// Getting a user by email
export const getUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT user_id, username, email, password_hash FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

