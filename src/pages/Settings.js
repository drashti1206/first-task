import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Settings = ({ user, logout }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate to other routes

  // Handle logout by calling the logout function and redirecting to the login page
  const handleLogout = () => {
    logout(); // Clears user authentication (this function should be passed down as a prop)
    navigate('/login'); // Redirects the user to the login page after logout
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r to-indigo-600 p-4">
      {/* Settings container with a background gradient */}
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-sm transform transition-transform duration-300 hover:scale-105">
        <div className="flex flex-col items-center">
          {/* User profile icon */}
          <FaUserCircle className="text-indigo-500 text-7xl mb-4" />
          {/* Display username, defaulting to 'User' if not available */}
          <h1 className="text-2xl font-extrabold text-gray-900 mb-2 text-center">
            {user?.username || 'User'}
          </h1>
          {/* Display role of the user, defaulting to 'Guest Access' if no role is provided */}
          <p className="text-sm text-gray-600 mb-6 text-center italic">
            {user?.role ? `Role: ${user.role}` : 'Guest Access'}
          </p>
        </div>
        {/* Logout button that triggers the handleLogout function */}
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
