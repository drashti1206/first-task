import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiInfo } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';

const Departments = () => {
  const [departments, setDepartments] = useState([]); // State to store department data
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedDepartment, setSelectedDepartment] = useState(null); // State to store selected department data
  const [userRole, setUserRole] = useState(''); // State to store user role (used for admin access)
  const navigate = useNavigate(); // Hook to navigate between routes

  useEffect(() => {
    // Fetch departments from the server on component mount
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:5000/departments'); // API call to fetch departments
        if (response.ok) {
          const data = await response.json(); // Parse response data
          setDepartments(data); // Set departments to state
        } else {
          console.error('Failed to fetch departments'); // Error handling
        }
      } catch (error) {
        console.error('Error fetching departments:', error); // Error handling
      }
    };

    // Get the user role from localStorage (instead of making an API call)
    const role = localStorage.getItem('user');
    const storedUserRole = role ? JSON.parse(role)?.role : null; // Parse user role from localStorage
    setUserRole(storedUserRole); // Set the user role from localStorage

    fetchDepartments(); // Fetch departments
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const handleViewDetails = (department) => {
    setSelectedDepartment(department); // Set the selected department for viewing details
    setShowModal(true); // Show the modal
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
    setSelectedDepartment(null); // Clear selected department
  };

  const getDepartmentDetails = (department) => {
    if (department.name === 'HR') {
      return (
        <div>
          <h3 className="font-medium text-lg text-gray-900">
            HR Department Details
          </h3>
          <ul className="list-disc pl-6">
            <li>Recruitment and onboarding</li>
            <li>Finding and hiring candidates</li>
            <li>Designing job descriptions</li>
            <li>Advertising job openings</li>
          </ul>
        </div>
      );
    }
    return (
      <p>
        Details for the {department.name} department will be displayed here.
      </p>
    );
  };

  return (
    <div className=" flex-h-screen flex-1 bg-gray-100 h-full p-4 md:p-6 transition-opacity duration-300 opacity-100">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Departments</h1>

      {/* Department List */}
      <ul className="space-y-4">
        {departments.map((department) => (
          <li
            key={department.id} // Unique key for each list item
            className="flex flex-col sm:flex-row justify-between items-center p-4 border border-gray-400 rounded-md shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <FiInfo className="text-indigo-500" />{' '}
              {/* Department info icon */}
              <span className="text-lg font-medium">
                {department.name}
              </span>{' '}
              {/* Department name */}
            </div>
            <button
              onClick={() => handleViewDetails(department)} // Show department details when clicked
              className="mt-4 sm:mt-0 sm:ml-4 px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>

      {/* Add Department Button - Only visible to admins */}
      {userRole === 'admin' && (
        <div className="mt-8 text-right">
          <button
            onClick={() => navigate('/add-department')} // Navigate to the "add department" page
            className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md text-sm transition-colors"
          >
            <FaPlus className="inline mr-2" /> {/* Add icon */}
            Add Department
          </button>
        </div>
      )}

      {/* Modal for showing department details */}
      {showModal && selectedDepartment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {selectedDepartment.name}{' '}
              {/* Display selected department's name */}
            </h2>
            {getDepartmentDetails(selectedDepartment)}
            <div className="flex justify-end">
              <button
                onClick={closeModal} // Close the modal when clicked
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Departments;
