import React, { useState } from 'react';
import axios from 'axios';
import "./index.css"

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register forms

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://backend:8000/register', { username, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://backend:8000/login', { username, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
    <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
      {isLogin ? 'Login' : 'Register'}
    </h1>
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-2 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      onClick={isLogin ? handleLogin : handleRegister}
      className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
    >
      {isLogin ? 'Login' : 'Register'}
    </button>
    <p className="text-center text-sm text-gray-600 mt-4">{message}</p>
    <button
      onClick={() => setIsLogin(!isLogin)}
      className="w-full mt-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white transition duration-300"
    >
      Switch to {isLogin ? 'Register' : 'Login'}
    </button>
  </div>
</div>

  );
}

export default App;
