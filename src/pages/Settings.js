import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaLock, FaFileAlt, FaInfoCircle } from 'react-icons/fa';
import axios from 'axios';

const Settings = ({ user }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [menu, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [userData, setUserData] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const ADMIN_PASSWORD = 'Admin@123';
  const USER_PASSWORD = 'Employee@123';

  const getCurrentPassword = () => {
    return user?.role === 'admin' ? ADMIN_PASSWORD : USER_PASSWORD;
  };

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/employees?email=${user.email}`)
        .then((response) => {
          const foundUser = response.data.find(
            (emp) => emp.email.toLowerCase() === user.email.toLowerCase()
          );
          if (foundUser) {
            setUserData(foundUser);
          } else {
            setUserData(null);
            console.error('User not found!');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setLoading(false);
        });
    }
  }, [user]);

  const handleMenuClick = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest('.menu-dropdown')) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, []);

  const handleChangePassword = async () => {
    const storedPassword =
      localStorage.getItem(user?.role) || getCurrentPassword();

    if (oldPassword !== storedPassword) {
      setMessage('Incorrect old password!');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match!');
      return;
    }

    if (newPassword.length < 8) {
      setMessage('Password must be at least 8 characters long.');
      return;
    }

    if (
      !/[A-Z]/.test(newPassword) ||
      !/[a-z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword) ||
      !/[@#$%^&*]/.test(newPassword)
    ) {
      setMessage(
        'Password must include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    localStorage.setItem(user?.role, newPassword);
    setMessage('Password updated successfully!');
  };

  return (
    <div className="flex min-h-screen bg-gray-100 w-full relative">
      {/* Sidebar */}
      <div className="hidden md:block w-1/4 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <ul>
          {[
            { name: 'Profile', key: 'profile', icon: FaUserCircle },

            { name: 'About Us', key: 'about', icon: FaInfoCircle },
            { name: 'Privacy Policy', key: 'privacy', icon: FaFileAlt },
            {
              name: 'Change Password',
              key: 'change-password',
              icon: FaLock,
              disabled: user?.role === 'admin',
            },
          ].map(({ name, key, icon: Icon, disabled }) => (
            <li
              key={key}
              className={`p-2 flex items-center rounded-lg ${
                disabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer hover:bg-gray-200'
              } ${
                activeSection === key
                  ? 'bg-indigo-100 text-indigo-700 font-semibold'
                  : ''
              }`}
              onClick={() => !disabled && handleMenuClick(key)}
            >
              <Icon className="mr-2" />
              {name}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Tab Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around p-2 border-t">
        {[
          { name: 'Profile', key: 'profile', icon: FaUserCircle },
          { name: 'About', key: 'about', icon: FaInfoCircle },
          { name: 'Privacy', key: 'privacy', icon: FaFileAlt },
          {
            name: 'Password',
            key: 'change-password',
            icon: FaLock,
            disabled: user?.role === 'admin',
          },
        ].map(({ name, key, icon: Icon, disabled }) => (
          <button
            key={key}
            className={`flex flex-col items-center p-2 ${disabled ? 'text-gray-400' : activeSection === key ? 'text-indigo-600' : 'text-gray-700'}`}
            onClick={() => !disabled && setActiveSection(key)}
            disabled={disabled}
          >
            <Icon className="text-xl" />
            <span className="text-xs">{name}</span>
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex flex-col items-center justify-center p-4 w-full md:w-3/4">
        {activeSection === 'profile' && (
          <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            {loading ? (
              <p className="text-center text-gray-500">Loading user data...</p>
            ) : user?.role === 'admin' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <strong>Name:</strong> Drashti Patel
                </p>
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <p>
                  <strong>Phone:</strong> 9824106523
                </p>
                <p>
                  <strong>Role:</strong> Admin
                </p>
              </div>
            ) : userData ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                <p>
                  <strong>ID:</strong> {userData.id}
                </p>
                <p>
                  <strong>Name:</strong> {userData.name}
                </p>
                <p className="break-all">
                  <strong>Email:</strong> {userData.email}
                </p>
                <p>
                  <strong>Phone:</strong>{' '}
                  {userData.contact || userData.phone || 'N/A'}
                </p>
                <p>
                  <strong>Hire Date:</strong>{' '}
                  {userData.hireDate || userData.hire_date || 'N/A'}
                </p>
              </div>
            ) : (
              <p className="text-center text-red-500">User not found.</p>
            )}
          </div>
        )}

        {/* About Us Section */}
        {activeSection === 'about' && (
          <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-gray-700">
              Welcome to our company! We are dedicated to providing the best
              services to our clients. Our mission is to create a seamless
              experience for employees and customers.
            </p>
            <p className="text-gray-700 mt-2">
              Established in 2021, we have been working hard to improve
              efficiency and productivity across various industries.
            </p>
          </div>
        )}

        {/* Privacy Policy Section */}
        {activeSection === 'privacy' && (
          <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
            <p className="text-gray-700">
              We value your privacy. Our system securely stores your data and
              ensures that no personal information is shared without consent.
            </p>
            <p className="text-gray-700 mt-2">
              By using our platform, you agree to our data protection policies
              and practices.
            </p>
          </div>
        )}
        {activeSection === 'change-password' && (
          <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>

            {user?.role === 'admin' ? (
              <p className="text-red-500">
                Password change is disabled for admins.
              </p>
            ) : (
              <>
                <input
                  type="password"
                  placeholder="Old Password"
                  className="w-full p-2 border rounded mb-2"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full p-2 border rounded mb-2"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full p-2 border rounded mb-2"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  onClick={handleChangePassword}
                  className={`w-full p-2 text-white rounded-lg ${
                    user?.role === 'admin'
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-indigo-500 hover:bg-indigo-600'
                  }`}
                  disabled={user?.role === 'admin'}
                >
                  Update Password
                </button>

                {message && <p className="mt-2 text-red-500">{message}</p>}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
