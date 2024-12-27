import React, { useState } from 'react';
import { FiInfo } from 'react-icons/fi'; // Using react-icons for department icons
import { FaPlus } from 'react-icons/fa'; // Using react-icons for the Add button

const Departments = () => {
  // Static list of departments
  const departments = [
    { id: 1, name: 'Human Resources' },
    { id: 2, name: 'Engineering' },
    { id: 3, name: 'Marketing' },
    { id: 4, name: 'Sales' },
    { id: 5, name: 'Customer Support' },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleViewDetails = (department) => {
    setSelectedDepartment(department);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDepartment(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">Departments</h1>

      {/* Department List */}
      <ul className="space-y-4">
        {departments.map((department) => (
          <li
            key={department.id}
            className="flex flex-col sm:flex-row justify-between items-center p-4 border border-gray-400 rounded-md shadow-sm transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <FiInfo className="text-indigo-500" />
              <span className="text-lg font-medium">{department.name}</span>
            </div>
            {/* View Details Button */}
            <button
              onClick={() => handleViewDetails(department)}
              className="mt-4 sm:mt-0 sm:ml-4 px-4 py-2 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>

      {/* Add Department Button */}
      <div className="mt-8 text-right">
        <button className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md text-sm transition-colors">
          <FaPlus className="inline mr-2" />
          Add Department
        </button>
      </div>
      {/* Modal for Viewing Department Details */}
      {showModal && selectedDepartment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              {selectedDepartment.name}
            </h2>
            <p className="text-gray-700 mb-4">
              Here are more details about the {selectedDepartment.name}{' '}
              department.
            </p>
            <div className="flex justify-end">
              <button
                onClick={closeModal}
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
