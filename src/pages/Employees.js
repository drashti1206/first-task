import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch employees data
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/employees");
      setEmployees(response.data);
    } catch (error) {
      setError("Failed to fetch employees.");
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch employees data on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle employee deletion
  const deleteEmployee = async (id) => {
    // Ask for confirmation before proceeding with the deletion
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    
    if (confirmDelete) {
      try {
        // Delete the employee from the server
        await axios.delete(`http://localhost:5000/employees/${id}`);
        
        // Refetch employees to update the UI
        fetchEmployees();
      } catch (error) {
        setError("Failed to delete employee.");
      }
    }
  };
  
  // Filter employees based on search term
  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort employees based on selected sort option
  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "department") {
      return a.department.localeCompare(b.department);
    }
    return 0;
  });
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen p-4 sm:p-6 bg-gray-100">
      <div className="mb-6 mt-10 w-full max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Employee List</h1>
      </div>

      {loading && <div>Loading employees...</div>}
      {error && <div>Error: {error}</div>}

      {!loading && !error && (
        <div className="mb-6 w-full max-w-4xl flex items-center gap-4 flex-col sm:flex-row sm:gap-4">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full sm:w-auto p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="mt-1 sm:mt-0 sm:p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="name">Sort by Name</option>
            <option value="department">Sort by Department</option>
          </select>
        </div>
      )}

      {!loading && !error && (
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg">
      {/* Add responsive scroll behavior */}
      <div className="overflow-x-auto sm:overflow-x-visible">
        <table className="w-full text-sm sm:text-base border-collapse">
            <thead>
                <tr>
                  <th className="px-4 py-2 text-left bg-gray-800 text-white font-bold uppercase border-b border-gray-300 border-r">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left bg-gray-800 text-white font-bold uppercase border-b border-gray-300 border-r">
                    Position
                  </th>
                  <th className="px-4 py-2 text-left bg-gray-800 text-white font-bold uppercase border-b border-gray-300 border-r">
                    Department
                  </th>
                  <th className="px-4 py-2 text-left bg-gray-800 text-white font-bold uppercase border-b border-gray-300 border-r">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left bg-gray-800 text-white font-bold uppercase border-b border-gray-300 border-r">
                    Phone
                  </th>
                  <th className="px-4 py-2 text-left bg-gray-800 text-white font-bold uppercase border-b border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="hover:bg-gray-200 even:bg-gray-50 odd:bg-white transition duration-300 ease-in-out"
                  >
                  
                  <td className="px-4 py-2 border-b border-gray-300 border-r">
                    <Link
                      to={`/employees/${employee.id}`}
                      className="text-blue-600 hover:text-blue-800 transition-all"
                    >
                      {employee.name}
                    </Link>
                  </td>

                    <td className="px-4 py-2 border-b border-gray-300 border-r">{employee.position}</td>
                    <td className="px-4 py-2 border-b border-gray-300 border-r">{employee.department}</td>
                    <td className="px-4 py-2 border-b border-gray-300 border-r">{employee.email}</td>
                    <td className="px-4 py-2 border-b border-gray-300 border-r">{employee.phone}</td>
                    <td className="px-4 py-2 border-b border-gray-300">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {/* Edit Button with Icon */}
                      <Link
                        to={`/edit/${employee.id}`}
                        className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 shadow-md transition-all"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      
                      {/* Delete Button with Icon */}
                      <button
                        onClick={() => deleteEmployee(employee.id)}
                        className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 shadow-md transition-all"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>


                  </tr>
                ))}
                {sortedEmployees.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500">
                      No employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl flex justify-start mt-6">
        <Link
          to="/add-employee"
          className="mb-6 px-6 py-2 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
        >
          Add New Employee
        </Link>
      </div>
    </div>
  );
};

export default Employees;
