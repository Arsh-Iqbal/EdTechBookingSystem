import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <nav className="bg-gray-800 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-lg font-semibold hover:text-gray-300">
            Home
          </Link>
          <Link to="/login" className="text-lg font-semibold hover:text-gray-300">
            Login
          </Link>
          <Link to="/signup" className="text-lg font-semibold hover:text-gray-300">
            Signup
          </Link>
        </div>
        
        {/* Conditionally render dashboard links based on role */}
        <div className="flex space-x-4">
          {role === 'instructor' && (
            <Link to="/instructor/dashboard" className="text-lg font-semibold hover:text-gray-300">
              Instructor Dashboard
            </Link>
          )}
          {role === 'student' && (
            <Link to="/student/dashboard" className="text-lg font-semibold hover:text-gray-300">
              Student Dashboard
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
