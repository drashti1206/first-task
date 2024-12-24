import React, { useState, useRef, useEffect } from "react";

const Header = () => {
  const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false); // State for employee dropdown
  const employeeDropdownRef = useRef(null); // Ref for the employee dropdown menu

  const toggleEmployeeDropdown = () => {
    setIsEmployeeDropdownOpen(!isEmployeeDropdownOpen);
  };

  // Close the employee dropdown if clicked outside of it
  const handleClickOutside = (e) => {
    if (employeeDropdownRef.current && !employeeDropdownRef.current.contains(e.target)) {
      setIsEmployeeDropdownOpen(false); // Close the dropdown if clicked outside
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the employee dropdown
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-8 py-3 bg-gray-800 text-white sticky top-0 z-50 shadow-md border-b border-gray-700">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src="/logo.jpg" alt="Logo" className="w-10 h-auto mr-3" />
        <span className="text-xl font-bold hover:text-blue-400 cursor-pointer">
          Employee Dashboard
        </span>
      </div>

      {/* Navigation for large screens */}
      <nav className="hidden sm:flex items-center space-x-6">
        <a href="/dashboard" className="hover:bg-blue-400 transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          Dashboard
        </a>

        {/* Employee Dropdown */}
        <div className="relative">
          <button
            onClick={toggleEmployeeDropdown}
            className="hover:bg-blue-400 transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Employees
          </button>

          {/* Dropdown Menu */}
          <div
            ref={employeeDropdownRef}
            className={`absolute ${isEmployeeDropdownOpen ? "block" : "hidden"} top-full left-0 bg-gray-700 text-white shadow-lg w-48 rounded-md transition-all`}
          >
            <a
              href="/employees"
              className="block px-4 py-2 hover:bg-blue-500 transition-colors rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              All Employees
            </a>
            <a
              href="/add-employee"
              className="block px-4 py-2 hover:bg-blue-500 transition-colors rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add New Employee
            </a>
          </div>
        </div>

        <a href="/departments" className="hover:bg-blue-400 transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          Departments
        </a>
        <a href="/settings" className="hover:bg-blue-400 transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          Settings
        </a>
      </nav>

      {/* Responsive Navigation for Small Screens */}
      {/* Only the logo and Employee Dashboard are visible on small screens */}
      <nav className="sm:hidden flex flex-1 justify-between items-center">
        <ul className="space-x-3 text-sm flex">
          <li className="hidden">
            <a href="/dashboard" className="hover:text-blue-400">
              Dashboard
            </a>
          </li>
          <li className="hidden">
            <a
              href="/employees"
              className="hover:text-blue-400"
              onClick={() => setIsEmployeeDropdownOpen(false)}
            >
              Employees
            </a>
          </li>
          <li className="hidden">
            <a href="/departments" className="hover:text-blue-400">
              Departments
            </a>
          </li>
          <li className="hidden">
            <a href="/settings" className="hover:text-blue-400">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
