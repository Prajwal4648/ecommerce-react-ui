import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,
          password: password
        })
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        navigate('/');
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      alert('Something went wrong');
      console.error(err);
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-blue-700 to-blue-400">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-300 w-full">
        {/* Lock icon at the top */}
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-4 rounded-full">
            <FiLock className="text-white text-2xl" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800">Welcome Back</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Sign in to your account</p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Username</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your username"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-500">
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={goToRegister}
            className="text-purple-600 font-medium hover:underline cursor-pointer"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
