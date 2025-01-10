import React from 'react';

const Dashboard = () => {
  return (
    <div className="dashboard p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
        Dashboard
      </h1>

      {/* Stats Cards - Displays summary data */}
      <div className="stats-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        
        {/* Number of Employees Card */}
        <div className="card bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col items-center hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
            Number of Employees
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-indigo-500">50</p>
          <img
            src="https://img.icons8.com/ios/452/teamwork.png"
            alt="Team"
            className="w-12 h-12 mt-4"
          />
        </div>

        {/* Active Departments Card */}
        <div className="card bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col items-center hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
            Active Departments
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-indigo-500">10</p>
          <img
            src="https://img.icons8.com/ios/452/building.png"
            alt="Departments"
            className="w-12 h-12 mt-4"
          />
        </div>

        {/* Projects Card */}
        <div className="card bg-white shadow-md rounded-lg p-4 sm:p-6 flex flex-col items-center hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
            Projects
          </h2>
          <p className="text-2xl sm:text-3xl font-bold text-indigo-500">25</p>
          {/* Replace with actual data URL */}
          <img
            src="https://img.icons8.com/ios/452/project.png"
            alt="Projects"
            className="w-12 h-12 mt-4"
          />
        </div>
      </div>

      {/* Recent Activities Section - Shows latest actions */}
      <div className="recent-activities mt-8 sm:mt-12 bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activities
        </h2>
        <ul className="space-y-4">
          <li className="flex items-center space-x-3">
            <span className="text-gray-600">📝</span>
            <p className="text-gray-700">
              Divya Patel updated the employee directory
            </p>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-gray-600">💼</span>
            <p className="text-gray-700">Project ABC reached 75% completion</p>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-gray-600">📈</span>
            <p className="text-gray-700">
              Department 5 exceeded their monthly targets
            </p>
          </li>
        </ul>
      </div>

      {/* Quick Actions Section - Allows navigation to various tasks */}
      <div className="quick-actions mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add New Employee Action */}
        <div className="action-card bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Add New Employee
          </h3>
          <button className="bg-indigo-500 text-white py-2 px-4 rounded-md">
            Add
          </button>
        </div>

        {/* View Reports Action */}
        <div className="action-card bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            View Reports
          </h3>
          <button className="bg-green-500 text-white py-2 px-4 rounded-md">
            View
          </button>
        </div>

        {/* Manage Projects Action */}
        <div className="action-card bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Manage Projects
          </h3>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-md">
            Manage
          </button>
        </div>
      </div>

      {/* Placeholder Section - Placeholder for future updates */}
      <div className="placeholder mt-8 sm:mt-12 bg-gray-200 rounded-lg p-4 sm:p-6 text-center">
        <p className="text-sm sm:text-lg text-gray-600">
          More details and charts coming soon!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
