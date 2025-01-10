import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

// EmployeeDetail Component
// Displays detailed information about a single employee fetched from an API.
const EmployeeDetail = () => {
  const { id } = useParams(); // Extracts the employee ID from the URL parameters
  const [employee, setEmployee] = useState(null); // Stores the employee details
  const [loading, setLoading] = useState(true); // Tracks the loading state of the API call
  const [error, setError] = useState(null); // Tracks any error during the API call

  // Get user role from localStorage
  const role = localStorage.getItem('user'); // Retrieve the 'user' key from localStorage
  const userRole = role ? JSON.parse(role)?.role : null; // Parse the role, fallback to null if not found
  console.log({ userRole });

  useEffect(() => {
    // Function to fetch employee details by ID
    const fetchEmployee = async () => {
      try {
        setLoading(true); // Set loading state before fetching data
        const response = await axios.get(
          `http://localhost:5000/employees/${id}` // API endpoint for fetching employee details
        );
        setEmployee(response.data); // Update state with the fetched employee data
      } catch (err) {
        setError('Failed to fetch employee details.'); // Set an error message if the API call fails
      } finally {
        setLoading(false); // End the loading state after the API call completes
      }
    };

    fetchEmployee(); // Trigger the API call on component mount
  }, [id]); // Re-run the effect if the `id` parameter changes

  // Display a loading message while data is being fetched
  if (loading)
    return (
      <div className="text-center text-gray-700">
        Loading employee details...
      </div>
    );

  // Display an error message if the API call fails
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  // Render the employee details once the data is successfully fetched
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen p-1 sm:p-6 bg-gray-100">
      <div className="mb-6 mt-10 w-full max-w-4xl text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Employee Details
        </h1>
      </div>

      {employee && (
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-4xl bg-white shadow-md rounded-lg p-6">
          {/* Display individual employee fields */}
          <p className="text-lg sm:text-xl font-semibold mb-4">
            Name: <span className="font-normal">{employee.name}</span>
          </p>
          <p className="text-lg sm:text-xl font-semibold mb-4">
            Position: <span className="font-normal">{employee.position}</span>
          </p>
          <p className="text-lg sm:text-xl font-semibold mb-4">
            Department:{' '}
            <span className="font-normal">{employee.department}</span>
          </p>
          <p className="text-lg sm:text-xl font-semibold mb-4">
            Email: <span className="font-normal">{employee.email}</span>
          </p>
          <p className="text-lg sm:text-xl font-semibold mb-4">
            Phone: <span className="font-normal">{employee.phone}</span>
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {/* Only show the Edit button if userRole is admin */}
            {userRole === 'admin' && (
              <Link
                to={`/edit/${employee.id}`}
                className="px-6 py-2 text-lg bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
              >
                Edit
              </Link>
            )}
            {/* Link to navigate back to the employees list */}
            <Link
              to="/employees"
              className="px-6 py-2 text-lg bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-all"
            >
              Back to List
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetail;
