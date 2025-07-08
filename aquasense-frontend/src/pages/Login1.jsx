

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// Optional: If you're importing the logo instead of using public folder
// import logo from '../assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        // ✅ Save token to localStorage
        localStorage.setItem('token', token);

        // ✅ Save user object for later userId retrieval
        localStorage.setItem('user', JSON.stringify(user));

        alert('Login successful!');
        navigate('/questionnaire'); // Redirect after login
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      {/* Left Side with Image */}
      <div
        className="w-1/2 hidden lg:flex flex-col justify-between bg-cover bg-center rounded-r-3xl p-8"
        style={{ backgroundImage: "url('bg.jpg')" }}
      >
        <div className="flex justify-end">
          <a
            href="/"
            className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700"
          >
            {/* ← Back */}
          </a>
        </div>
        <div className="text-center mb-20">
          <h1 className="text-3xl font-semibold">💧 AquaSense — Save Every Drop</h1>
          <p className="text-sm mt-2 text-gray-200">
            Join the movement to track, reduce, and optimize your water usage.
          </p>
        </div>
      </div>

      {/* Right Side with Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md space-y-6 text-center"
        >
          {/* Logo at the top */}
          <img
            src="Logo.jpg" // or use {logo} if imported above
            alt="AquaSense Logo"
            className="mx-auto w-16 h-16 rounded-full shadow-md border border-gray-700"
          />

          <h2 className="text-3xl font-bold text-white mt-2">Sign in to AquaSense</h2>
          <p className="text-sm text-gray-400">
            Don’t have an account?{' '}
            <a href="/signup" className="text-indigo-400 hover:underline">
              Sign Up
            </a>
          </p>

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 rounded hover:bg-indigo-700 transition"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

        </form>
      </div>
    </div>
  );
}