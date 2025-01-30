import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loginType, setLoginType] = useState('');
  const navigate = useNavigate();

  const predefinedPassword = 'Employee@123';
  
  const handleEmployeeLogin = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      const employee = response.data.find(emp => emp.email.toLowerCase() === email.toLowerCase());
  
      if (employee) {
        if (password === predefinedPassword) {
          onLogin({ email: employee.email, role: 'employee' });
          navigate('/dashboard');
        } else {
          setError('Incorrect password for the employee.');
        }
      } else {
        setError(`Employee not found for email: ${email}`);
      }
    } catch (error) {
      setError('Error logging in. Please try again.');
    }
  };

  const handleLogin = () => {
    setError('');

    if (!email || !password || !loginType) {
      setError('All fields are required.');
      return;
    }

    if (loginType === 'admin') {
      if (email !== 'drashti@gmail.com') {
        setError('Only drashti@gmail.com can log in as admin.');
        return;
      }
      if (password === 'Admin@123') {
        onLogin({ email: 'drashti@gmail.com', role: 'admin' });
        navigate('/dashboard');
      } else {
        setError('Incorrect password for admin.');
      }
    } else if (loginType === 'user') {
      handleEmployeeLogin();
    } else {
      setError('Invalid role selected.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      <div className="absolute top-0 left-4 p-4 flex items-center">
        <img src="logo.jpg" alt="Employee Management Logo" className="w-12 h-12 mr-3" />
        <h1 className="text-gray-800 font-bold text-xl">Employee Management</h1>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-4xl font-semibold text-gray-800 mb-2 text-center">Welcome!</h2>
        <h2 className="text-lg font-medium text-gray-600 mb-4 text-center">Please enter your details.</h2>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
          <select value={loginType} onChange={(e) => setLoginType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
            <option value="" disabled>Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {error && <div className="mb-4 text-red-600 text-sm font-medium text-center">{error}</div>}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your email" required />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <div className="flex items-center border border-gray-300 rounded-md relative">
            <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password" required />
            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="absolute right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} />
          </div>
        </div>

        <button onClick={handleLogin} className="w-full py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500">
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
