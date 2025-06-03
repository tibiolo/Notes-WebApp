import app from './app.js';
import dotenv from 'dotenv';

// Loading environment variables
dotenv.config();

// Starting the server
const PORT = process.env.BACKEND_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
                                                                  