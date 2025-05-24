import React, { useState } from 'react';
import axios from '../../utils/axios.js';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { validateEmail } from '../../utils/validator';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!formData.username) {
      setError('Please enter your name');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!formData.password) {
      setError('Please enter a valid password.');
      return error;
    }

    if (!formData.confirmPassword) {
      setError('Please enter a valid password confirmation.');
      return error;
    }

    if (formData.password != formData.confirmPassword) {
      setError('Passwords do not match!');
    }

    setError('');

    // (API CALL)

    try {
      await axios.post('/api/users/register', formData);
      navigate('/login');
    } catch (err) {
      console.error('Error - SignUp Failed: ', err);
      setError('SignUp Failed, Try Again.');
    }
  };

  return (
    <>
      <Navbar showSearchAndUser={false} />

      <div className="flex items-center justify-center mt-28">
        <div className="w-96 border-2 border-gray-300 rounded bg-white px-7 py-10">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl mb-7">SignUp</h4>
            <input
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Username"
              className="input-box"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              name="email"
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
            />
            <PasswordInput
              name={'confirmPassword'}
              placeholder={'Confirm password'}
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

            <button type="submit" className="btn-primary cursor-pointer">
              Create Account
            </button>
            <p className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-primary underline ">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
