import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!departmentName) {
      setFeedback('Department name is required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/departments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: departmentName }),
      });

      if (response.ok) {
        setFeedback('Department added successfully!');
        setTimeout(() => navigate('/departments'), 2000);
      } else {
        setFeedback('Failed to add department.');
      }
    } catch (error) {
      setFeedback('Error connecting to the server.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Add Department
        </h1>

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
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter department name"
            />
          </div>

          {feedback && <p className="text-red-500 mb-4">{feedback}</p>}

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
