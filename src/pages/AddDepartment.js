import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  // State to manage the department name input field
  const [departmentName, setDepartmentName] = useState('');
  // State to manage feedback messages for the user
  const [feedback, setFeedback] = useState('');
  // `useNavigate` hook for navigation after the department is successfully added
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if department name is provided, and display feedback if not
    if (!departmentName) {
      setFeedback('Department name is required.');
      return;
    }

    try {
      // Send a POST request to the backend to add the new department
      const response = await fetch('http://localhost:5000/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: departmentName }), // Pass the department name as the request body
      });

      // If the response is successful, show a success message
      if (response.ok) {
        setFeedback('Department added successfully!');
        // Redirect to the departments list page after a brief delay
        setTimeout(() => navigate('/departments'), 2000);
      } else {
        // If the request fails, show a failure message
        setFeedback('Failed to add department.');
      }
    } catch (error) {
      // Catch any network or server errors and display an error message
      setFeedback('Error connecting to the server.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Add Department
        </h1>

        {/* Form to add a new department */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="departmentName"
              className="block text-gray-700 font-medium mb-2"
            >
              Department Name
            </label>
            <input
              type="text"
              id="departmentName"
              value={departmentName} // Controlled input, value is managed by the state
              onChange={(e) => setDepartmentName(e.target.value)} // Update state when input changes
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter department name"
            />
          </div>

          {/* Display feedback message if there's any */}
          {feedback && <p className="text-green-500 mb-4">{feedback}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Add Department
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
