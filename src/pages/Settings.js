import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Settings = ({ user, logout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Clear user authentication
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r to-indigo-600 p-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm transform transition-transform duration-300 hover:scale-105">
        <div className="flex flex-col items-center">
          <FaUserCircle className="text-indigo-500 text-7xl mb-4" />
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">
            Welcome, {user?.username || 'User'}
          </h1>
          <p className="text-sm text-gray-600 mb-6 text-center italic">
            {user?.role ? `Role: ${user.role}` : 'Guest Access'}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
