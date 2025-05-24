import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../models/userModel.js';

// Loading JSON WEB TOKEN SECRET
const JWT_SECRET = process.env.JWT_SECRET;

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const payload = {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 3600000,
      })
      .json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });
  return res.status(200).json({ message: 'Logged out successfully' });
};
