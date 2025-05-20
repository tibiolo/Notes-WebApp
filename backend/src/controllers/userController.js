import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from '../models/userModel.js';


const SALT_ROUNDS = 10;

// Registering user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const result = await createUser(username, email, hashedPassword);

    res.status(201).json({
      message: 'User registered successfully',
      user: result,
    });
  } catch (err) {
    console.error('Registration error', err);
    res.status(500).json({ error: 'Server error' });
  }
};

