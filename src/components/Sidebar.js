import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  // State variables for managing dropdowns, user details, and logout confirmation
  const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
  const [shownToasts, setShownToasts] = useState({});
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [username, setUsername] = useState(''); // State to store the username
  const [userRole, setUserRole] = useState(''); // State to store the user role (admin/user)

  // Ref for detecting clicks outside the employee dropdown
  const employeeDropdownRef = useRef(null);
  const navigate = useNavigate();

  // Retrieve user role from localStorage
  const role = localStorage.getItem('user');
  const currentRole = role ? JSON.parse(role)?.role : null; // Fetching the role from localStorage

  // Toggle Employee dropdown visibility
  const toggleEmployeeDropdown = () => {
    setIsEmployeeDropdownOpen(!isEmployeeDropdownOpen);
  };

  // Handles clicks outside the employee dropdown to close it
  const handleClickOutside = (e) => {
    if (
      employeeDropdownRef.current &&
      !employeeDropdownRef.current.contains(e.target)
    ) {
      setIsEmployeeDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Fetch the username and role from the JSON server
    const fetchUserData = async () => {
      const userEmail = JSON.parse(role)?.email; // Assuming email is in localStorage
      if (userEmail) {
        try {
          const response = await fetch('http://localhost:5000/employees');
          const employees = await response.json();
          const user = employees.find((emp) => emp.email === userEmail);
          if (user) {
            setUsername(user.name); // Set the username state from the 'name' field
            setUserRole(currentRole); // Set the user role state
          }
        } catch (error) {
          console.error('Error fetching username:', error);
        }
      }
    };

    fetchUserData();

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [role, currentRole]);

  const handleToast = (message, key) => {
    if (!shownToasts[key]) {
      toast.success(message, {
        position: 'top-right',
        autoClose: 3000,
      });
      setShownToasts((prev) => ({ ...prev, [key]: true }));
    }
  };

  const handleLinkClick = () => {
    if (isSidebarOpen) {
      toggleSidebar(); // Close the sidebar when a link is clicked on small screen
    }
  };

  const handleLogoutClick = () => {
    setShowLogoutConfirmation(true);
  };

  const logout = () => {
    // Add any additional logout logic here (e.g., clearing cookies, resetting state)
    console.log('User logged out'); // Debug statement
  };

  const handleLogout = () => {
    console.log('Logging out...');
    setShowLogoutConfirmation(false);
    handleToast('You have been logged out', 'logout');
    localStorage.removeItem('user'); // Clear user data
    logout(); // Call the logout function
    navigate('/login'); // Redirect to login page
    console.log('Navigated to login page.');
  };

  const cancelLogout = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <>
      <aside
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } md:block sticky top-0 w-48 bg-gray-800 text-white h-[100vh] shadow-md z-50 transition-all duration-300`}
      >
        {/* Logo and Title Section */}
        <div className="flex flex-col items-center py-6">
          <img
            src="logo.jpg"
            alt="Logo"
            className="w-16 h-16 mb-2 rounded-full"
          />
          <h1 className="text-lg text-center font-semibold">
            Employee Management
          </h1>
        </div>

        {/* Navigation Section */}
        <nav className="flex flex-col space-y-4 p-4">
          <Link
            to="/dashboard"
            onClick={() => {
              handleToast('Navigated to Dashboard', 'dashboard');
              handleLinkClick();
            }}
            className="flex items-center hover:bg-blue-400 transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <i className="fas fa-tachometer-alt mr-2"></i>
            Dashboard
          </Link>
          {currentRole === 'admin' ? (
            <div className="relative">
              <button
                onClick={toggleEmployeeDropdown}
                className="flex items-center w-full text-left hover:bg-blue-400 transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <i className="fas fa-users mr-2"></i>
                Employees
              </button>
              <div
                ref={employeeDropdownRef}
                className={`absolute ${
                  isEmployeeDropdownOpen ? 'block' : 'hidden'
                } bg-gray-700 text-white shadow-lg w-48 rounded-md mt-2`}
              >
                <Link
                  to="/employees"
                  onClick={() => {
                    handleToast('Viewing all employees', 'view-employees');
                    handleLinkClick();
                  }}
                  className="block px-4 py-2 hover:bg-blue-500 transition-colors"
                >
                  <i className="fas fa-users mr-2"></i>
                  All Employees
                </Link>
                <Link
                  to="/add-employee"
                  onClick={() => {
                    handleToast('Navigating to Add Employee', 'add-employee');
                    handleLinkClick();
                  }}
                  className="block px-4 py-2 hover:bg-blue-500 transition-colors"
                >
                  <i className="fas fa-user-plus mr-2"></i>
                  Add New Employee
                </Link>
              </div>
            </div>
          ) : (
            <Link
              to="/employees"
              onClick={() => {
                handleToast('Viewing all employees', 'view-employees');
                handleLinkClick();
              }}
              className="flex items-center hover:bg-blue-400 transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <i className="fas fa-users mr-2"></i>
              Employee
            </Link>
          )}
          <Link
            to="/departments"
            onClick={() => {
              handleToast('Viewing Departments', 'view-departments');
              handleLinkClick();
            }}
            className="flex items-center hover:bg-blue-400 transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <i className="fas fa-building mr-2"></i>
            Departments
          </Link>
          <Link
            to="/settings"
            onClick={() => {
              handleToast('Viewing Settings', 'view-settings');
              handleLinkClick();
            }}
            className="flex items-center hover:bg-blue-400 transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <i className="fas fa-cogs mr-2"></i>
            Settings
          </Link>
        </nav>

        {/* Display user username and vertical (ellipsis) Dots Menu */}
        <div className="absolute bottom-4 left-4 w-full flex justify-between items-center px-4">
          <h1 className="text-lg font-semibold text-white">
            {currentRole === 'admin' ? 'Drashti Patel' : username || 'Name'}
          </h1>
          <button
            onClick={handleLogoutClick}
            className="flex items-center justify-center w-10 h-10 text-xl text-white rounded-full focus:outline-none"
            title="Options"
          >
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </aside>

      {/* Logout Confirmation Modal using Portal */}
      {showLogoutConfirmation &&
        ReactDOM.createPortal(
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white text-black p-6 rounded-md shadow-lg">
              <p className="mb-4 text-center">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Logout
                </button>
                <button
                  onClick={cancelLogout}
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body // Render the modal in the body
        )}
    </>
  );
};

export default Sidebar;
