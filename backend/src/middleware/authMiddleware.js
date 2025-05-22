import jwt from 'jsonwebtoken';

// Loading JSON TOKEN SECRET
const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
  }

  console.log(token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
