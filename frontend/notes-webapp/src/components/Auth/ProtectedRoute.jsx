import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from '../../utils/axios.js';

const ProtectedRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    axios
      .get('/api/users/auth')
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));
  }, []);

  if (isLoggedIn === null) return <p>Checking login...</p>;

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
