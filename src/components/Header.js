import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
  const employeeDropdownRef = useRef(null);

  const toggleEmployeeDropdown = () => {
    setIsEmployeeDropdownOpen(!isEmployeeDropdownOpen);
  };

  const handleClickOutside = (e) => {
    if (
      employeeDropdownRef.current &&
      !employeeDropdownRef.current.contains(e.target)
    ) {
      setIsEmployeeDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Example toast notification
  const handleToast = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 bg-gray-800 text-white sticky top-0 z-50 shadow-md border-b border-gray-700">
      {/* Logo */}
      <div className="flex items-center">
        <img src="/logo.jpg" alt="Logo" className="w-10 h-auto mr-3" />
        <span className="text-xl font-bold hover:text-blue-400 cursor-pointer">
          <Link to="/">Employee Dashboard</Link>
        </span>
      </div>

      {/* Navbar (visible only on large screens) */}
      <nav className="hidden sm:flex items-center space-x-6">
        <Link
          to="/dashboard"
          onClick={() => handleToast("Navigated to Dashboard")}
          className="hover:bg-blue-400 transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Dashboard
        </Link>
        <div className="relative">
          <button
            onClick={toggleEmployeeDropdown}
            className="hover:bg-blue-400 transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Employees
          </button>
          <div
            ref={employeeDropdownRef}
            className={`absolute ${
              isEmployeeDropdownOpen ? "block" : "hidden"
            } top-full left-0 bg-gray-700 text-white shadow-lg w-48 rounded-md transition-all`}
          >
            <Link
              to="/employees"
              className="block px-4 py-2 hover:bg-blue-500 transition-colors rounded-t-md"
              onClick={() => handleToast("Viewing all employees")}
            >
              All Employees
            </Link>
            <Link
              to="/add-employee"
              className="block px-4 py-2 hover:bg-blue-500 transition-colors rounded-t-md"
              onClick={() => handleToast("Navigating to Add Employee")}
            >
              Add New Employee
            </Link>
          </div>
        </div>
        <Link
          to="/departments"
          className="hover:bg-blue-400 transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => handleToast("Viewing Departments")}
        >
          Departments
        </Link>
        <Link
          to="/settings"
          className="hover:bg-blue-400 transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => handleToast("Viewing Settings")}
        >
          Settings
        </Link>
      </nav>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="z-[9999]" // Ensure it appears above other elements
      />
    </header>
  );
};

export default Header;
