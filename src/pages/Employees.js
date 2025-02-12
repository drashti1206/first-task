import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('');
  const [filterPosition, setFilterPosition] = useState('');
  const [filterHireDate, setFilterHireDate] = useState('');
  const [sortOption, setSortOption] = useState('name');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const role = localStorage.getItem('user');
  const userRole = role ? JSON.parse(role)?.role : null;
  const fetchEmployees = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/employees`);
      const totalCount = response.data.length;
      console.log(totalCount);
      setTotalPages(Math.ceil(totalCount / pageSize));
      setEmployees(response.data);
      const sanitizedEmployees = response.data.map((employee, index) => ({
        ...employee,
        uniqueKey: `${employee.id || index}-${index}`,
      }));
      setEmployees(sanitizedEmployees);
    } catch (error) {
      setError('Failed to fetch employees.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(currentPage); // Fetch employees whenever the currentPage changes
  }, [currentPage]);

  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this employee?'
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/employees/${id}`);
        fetchEmployees(currentPage); // Refetch employees for the current page
      } catch (error) {
        setError('Failed to delete employee.');
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchEmployees(newPage); // Fetch data for the new page
    }
  };

  const fuzzyMatch = (input, target) => {
    const inputLower = input.toLowerCase();
    const targetLower = target.toLowerCase();

    let i = 0,
      j = 0;
    while (i < inputLower.length && j < targetLower.length) {
      if (inputLower[i] === targetLower[j]) {
        i++;
      }
      j++;
    }
    return i === inputLower.length; // Return true if all characters in input match in order.
  };

  const filteredEmployees = useMemo(() => {
    return employees
      .filter((employee) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          (!filterDepartment || employee.department === filterDepartment) &&
          (!filterPosition || employee.position === filterPosition) &&
          (!filterHireDate || employee.hireDate === filterHireDate) &&
          (fuzzyMatch(searchLower, employee.name) ||
            fuzzyMatch(searchLower, employee.email))
        );
      })
      .sort((a, b) => {
        if (sortOption === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortOption === 'department') {
          return a.department.localeCompare(b.department);
        }
        return 0;
      });
  }, [
    employees,
    searchTerm,
    filterDepartment,
    filterPosition,
    filterHireDate,
    sortOption,
  ]);

  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredEmployees.slice(startIndex, endIndex);
  }, [filteredEmployees, currentPage]);

  return (
    <div className="flex h-screen">
      <main className="flex-1 bg-gray-100 overflow-y-auto p-4 md:p-6 transition-opacity duration-300 opacity-100">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-blue-800">Employees</h1>
          {userRole === 'admin' && (
            <Link
              to="/add-employee"
              className="mb-6 px-4 py-2 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            >
              + Add Employee
            </Link>
          )}
        </header>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search employees by name or email..."
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="mt-1 sm:mt-0 sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Departments</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Customer Care">Customer Care</option>
            <option value="Executive">Executive</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
          </select>
          <select
            value={filterPosition}
            onChange={(e) => setFilterPosition(e.target.value)}
            className="mt-1 sm:mt-0 sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Positions</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Analyst">Analyst</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="Product Manager">Product Manager</option>
            <option value="Technician">Technician</option>
            <option value="Consultant">Consultant</option>
          </select>
          <input
            type="date"
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setFilterHireDate(e.target.value)}
            value={filterHireDate}
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="mt-1 sm:mt-0 sm:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="name">Sort by Name</option>
            <option value="department">Sort by Department</option>
          </select>
        </div>
        {loading && <div>Loading Employees...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && (
          <>
            <div className="overflow-x-auto max-h-[80vh] overflow-y-auto">
              <table className="w-full table-auto border border-gray-300 rounded-lg shadow-sm sm:bg-gray-100">
                <thead className="bg-blue-100 border-b border-gray-300 sticky top-0">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-800">Name</th>
                    <th className="px-4 py-2 text-left text-gray-800">
                      Position
                    </th>
                    <th className="px-4 py-2 text-left text-gray-800">
                      Department
                    </th>
                    <th className="px-4 py-2 text-left text-gray-800">Email</th>
                    <th className="px-4 py-2 text-left text-gray-800">Phone</th>
                    <th className="px-4 py-2 text-left text-gray-800">
                      Hire Date
                    </th>
                    {userRole === 'admin' && (
                      <th className="p-4 text-left text-blue-800">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {paginatedEmployees.length > 0 ? (
                    paginatedEmployees.map((employee) => (
                      <tr
                        key={employee.uniqueKey}
                        className="hover:bg-gray-200 even:bg-gray-50 odd:bg-white transition duration-300 ease-in-out"
                      >
                        <td className="px-4 py-2 border-b border-gray-300">
                          {employee.name}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300">
                          {employee.position}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300">
                          {employee.department}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300">
                          {employee.email}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300">
                          {employee.phone}
                        </td>
                        <td className="px-4 py-2 border-b border-gray-300">
                          {employee.hireDate
                            ? format(
                                new Date(employee.hireDate),
                                'MMM dd, yyyy'
                              )
                            : 'n/a'}
                        </td>
                        {userRole === 'admin' && (
                          <td className="px-4 py-2 border-b border-gray-300">
                            <div className="flex gap-2 justify-center">
                              <Link
                                to={`/edit/${employee.id}`}
                                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 shadow-md transition-all"
                              >
                                <i className="fas fa-edit"></i>
                              </Link>
                              <button
                                onClick={() => deleteEmployee(employee.id)}
                                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 shadow-md transition-all"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={userRole === 'admin' ? 7 : 6}
                        className="text-center py-4 text-gray-500"
                      >
                        No employees found.{' '}
                        {userRole === 'admin' && (
                          <Link to="/add-employee" className="text-blue-600">
                            Add Employee
                          </Link>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Employees;
