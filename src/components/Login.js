import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState(''); // State to store username input
  const [password, setPassword] = useState(''); // State to store password input
  const [error, setError] = useState(''); // State for error messages
  const [loginType, setLoginType] = useState(''); // State for toggling between admin and user login
  const navigate = useNavigate(); // Hook for programmatic navigation

  // Function to validate password
  const isPasswordValid = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Function to validate user credentials and navigate based on the role
  const handleLogin = () => {
    // Reset error state
    setError('');

    // Validate password
    if (!isPasswordValid(password)) {
      setError(
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return;
    }

    // Dummy credentials for demonstration purposes
    if (
      username === 'admin' &&
      password === 'Admin@123' &&
      loginType === 'admin'
    ) {
      // Simulate Admin login
      onLogin({ username: 'admin', role: 'admin' });
      navigate('/dashboard'); // Redirect to dashboard
    } else if (
      username === 'user' &&
      password === 'User@123' &&
      loginType === 'user'
    ) {
      // Simulate User login
      onLogin({ username: 'user', role: 'user' });
      navigate('/dashboard'); // Redirect to dashboard
    } else {
      // Show alert for invalid credentials
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm transition-all">
        {/* Logo Section */}
        <div className="flex justify-around mb-6 transition-all">
          {/* Admin Logo */}
          {loginType !== 'user' && (
            <div
              onClick={() => setLoginType('admin')}
              className={`cursor-pointer ${loginType === 'admin' ? 'border-teal-600 transform scale-110' : ''} transition-all duration-300`}
            >
              <img
                src="user.jpg" // Replace with Admin logo path
                alt="Admin Logo"
                className="w-16 h-16 rounded-full border-2 border-transparent hover:border-teal-500"
              />
              <p className="text-center text-sm mt-2">Admin</p>
            </div>
          )}

          {/* User Logo */}
          {loginType !== 'admin' && (
            <div
              onClick={() => setLoginType('user')}
              className={`cursor-pointer ${loginType === 'user' ? 'border-teal-600 transform scale-110' : ''} transition-all duration-300`}
            >
              <img
                src="user.jpg" // Replace with User logo path
                alt="User Logo"
                className="w-16 h-16 rounded-full border-2 border-transparent hover:border-teal-500"
              />
              <p className="text-center text-sm mt-2">User</p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 text-red-600 text-sm font-medium text-center">
            {error}
          </div>
        )}

        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Username
          </label>
          <div className="flex items-center border border-gray-300 rounded-md">
            <FontAwesomeIcon
              icon={faUser}
              className="w-5 h-5 ml-2 text-gray-500"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Updates username state
              className="w-full px-4 py-2 pl-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>
          <div className="flex items-center border border-gray-300 rounded-md">
            <FontAwesomeIcon
              icon={faLock}
              className="w-5 h-5 ml-2 text-gray-500"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Updates password state
              className="w-full px-4 py-2 pl-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
        </div>

        {/* Forgot Password */}
        <div className="mb-6 text-left">
          <a
            href="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin} // Calls the handleLogin function on click
          className="w-full py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
