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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <div className="flex flex-col items-center">
          <FaUserCircle className="text-gray-600 text-6xl mb-4" />
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Hello, {user?.username || 'User'}
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            Role: {user?.role || 'Guest'}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-500 text-white font-medium rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
