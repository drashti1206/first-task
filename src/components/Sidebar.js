import React, { useState, useRef, useEffect } from 'react';

const Sidebar = () => {
  const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
  const employeeDropdownRef = useRef(null); // Ref to handle the employee dropdown menu

  // Toggle the employee dropdown open/closed
  const toggleEmployeeDropdown = () => {
    setIsEmployeeDropdownOpen(!isEmployeeDropdownOpen);
  };

  // Close the employee dropdown if clicked outside
  const handleClickOutside = (e) => {
    if (
      employeeDropdownRef.current &&
      !employeeDropdownRef.current.contains(e.target)
    ) {
      setIsEmployeeDropdownOpen(false); // Close dropdown if click is outside
    }
  };

  useEffect(() => {
    // Add event listener for detecting clicks outside the dropdown
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <aside className="sticky top-0 w-32 sm:w-48 bg-gray-800 text-white h-screen shadow-md transition-all">
      {/* Sidebar Content */}
      <div className="h-full overflow-y-auto">
        <ul className="space-y-4 p-4">
          <li>
            <a
              href="/dashboard"
              className="block px-2 py-2 text-white hover:bg-primary rounded-md"
            >
              Dashboard
            </a>
          </li>

          <li className="relative">
            {/* Button to toggle the employee dropdown */}
            <button
              className="block w-full text-left px-2 py-2 text-white hover:bg-primary rounded-md"
              onClick={toggleEmployeeDropdown}
            >
              Employees
            </button>

            {/* Employee dropdown - only visible when `isEmployeeDropdownOpen` is true */}
            {isEmployeeDropdownOpen && (
              <div
                ref={employeeDropdownRef} // Attach the ref to track clicks outside
                className="absolute top-full left-0 bg-gray-700 text-white w-full mt-2 shadow-lg rounded-md"
              >
                {/* Links inside the dropdown */}
                <a
                  href="/employees"
                  className="block px-2 py-2 hover:bg-blue-500 rounded-t-md"
                >
                  All Employees
                </a>
                <a
                  href="/add-employee"
                  className="block px-2 py-2 hover:bg-blue-500 rounded-b-md"
                >
                  Add New Employee
                </a>
              </div>
            )}
          </li>

          {/* Additional sidebar links */}
          <li>
            <a
              href="/departments"
              className="block px-2 py-2 text-white hover:bg-primary rounded-md"
            >
              Departments
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className="block px-2 py-2 text-white hover:bg-primary rounded-md"
            >
              Settings
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
