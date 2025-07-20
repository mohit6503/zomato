// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token); 
      navigate('/'); 
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Login to Zomato</h2>

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}
          required className="w-full mb-4 px-4 py-2 border border-gray-300 rounded placeholder-black text-black" />

        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange}
          required className="w-full mb-6 px-4 py-2 border border-gray-300 rounded placeholder-black text-black" />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account? <Link to="/register" className="text-green-600 hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
