import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/validator';
import axios from '../../utils/axios.js';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!formData.password) {
      setError('Please enter your password.');
      return;
    }

    setError('');

    // (API CALL)

    try {
      const response = await axios.post('/api/users/login', formData);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error Logging in', err);
      setError('Login failed');
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border-2 border-gray-300 rounded bg-white px-7 py-10">
          <form onSubmit={handleLogin}>
            <h4 className="text-2xl mb-7">Login</h4>
            <input
              name={'email'}
              type="text"
              autoComplete="email"
              placeholder="Email"
              className="input-box"
              value={formData.email}
              onChange={handleChange}
            />

            <PasswordInput
              name={'password'}
              value={formData.password}
              onChange={handleChange}
              type={'password'}
              placeholder={'Password'}
              className={
                'w-full  text-sm bg-transparent py-3 mr-3 rounded outline-none'
              }
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary cursor-pointer">
              Login
            </button>
            <p className="text-sm text-center mt-4">
              Not registered yet?{' '}
              <Link
                to="/signUp"
                className="font-medium text-primary underline "
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
