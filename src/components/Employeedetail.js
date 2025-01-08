import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetail = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/employees/${id}`
        );
        setEmployee(response.data);
      } catch (err) {
        setError('Failed to fetch employee details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading)
    return (
      <div className="text-center text-gray-700">
        Loading employee details...
      </div>
    );
  if (error)
    return <div className="text-center text-red-600">Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen p-1 sm:p-6 bg-gray-100">
      <div className="mb-6 mt-10 w-full max-w-4xl text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          Employee Details
        </h1>
      </div>

      {employee && (
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-4xl bg-white shadow-md rounded-lg p-6">
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
            <Link
              to={`/edit/${employee.id}`}
              className="px-6 py-2 text-lg bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
            >
              Edit
            </Link>
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
