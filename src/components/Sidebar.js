import React, { useState, useRef, useEffect } from "react";

const Sidebar = () => {
  const [isEmployeeDropdownOpen, setIsEmployeeDropdownOpen] = useState(false);
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
    <aside className="sticky top-0 w-32 sm:w-48 bg-gray-800 text-white h-screen shadow-md transition-all">
      {/* Sidebar Content */}
      <div className="h-full overflow-y-auto">
        <ul className="space-y-4 p-4">
          <li>
            <a
              href="/dashboard"
              className="block px-4 py-2 text-white hover:bg-primary rounded-md"
            >
              Dashboard
            </a>
          </li>
          <li className="relative">
            <button
              className="block w-full text-left px-4 py-2 text-white hover:bg-primary rounded-md"
              onClick={toggleEmployeeDropdown}
            >
              Employees
            </button>
            {isEmployeeDropdownOpen && (
              <div
                ref={employeeDropdownRef} // Attach ref to the dropdown menu
                className="absolute top-full left-0 bg-gray-700 text-white w-full mt-2 shadow-lg rounded-md"
              >
                <a
                  href="/employees"
                  className="block px-4 py-2 hover:bg-blue-500 rounded-t-md"
                >
                  All Employees
                </a>
                <a
                  href="/add-employee"
                  className="block px-4 py-2 hover:bg-blue-500 rounded-b-md"
                >
                  Add New Employee
                </a>
              </div>
            )}
          </li>

          <li>
            <a
              href="/departments"
              className="block px-4 py-2 text-white hover:bg-primary rounded-md"
            >
              Departments
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className="block px-4 py-2 text-white hover:bg-primary rounded-md"
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