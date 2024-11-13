import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); 
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password, role });
   

      localStorage.setItem('token', response.data.token); // Store token
      localStorage.setItem('role', response.data.role);   // Store role
      
         // Navigate based on the role
      if (response.data.role === 'instructor') {
        navigate('/instructor/dashboard'); 
      } else {
        navigate('/student/dashboard');
      }
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Signup</h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
