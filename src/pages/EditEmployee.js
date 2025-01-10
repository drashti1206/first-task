import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaUser,
  FaBriefcase,
  FaBuilding,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';

const EditEmployee = () => {
  const { id } = useParams(); // Get employee ID from route params (used for fetching the employee data)
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
  }); // State to store form data for employee
  const [errors, setErrors] = useState({}); // State to store form validation errors
  const [feedback, setFeedback] = useState(''); // State to store success or error feedback messages
  const navigate = useNavigate(); // Hook to navigate between pages

  useEffect(() => {
    // Fetch existing employee data based on the employee ID
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/employees/${id}`); // API call to fetch employee details
        if (response.ok) {
          const data = await response.json(); // Parse the response and set the form data
          setFormData(data);
        } else {
          setFeedback('Failed to fetch employee data.'); // Error feedback
        }
      } catch (error) {
        setFeedback('Error connecting to the server.'); // Error feedback
      }
    };

    fetchEmployeeData(); // Trigger the employee data fetching on component mount
  }, [id]); // Effect depends on the employee ID in the URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the specific field in the formData state
    });
  };

  // Form validation function
  const validateForm = () => {
    const newErrors = {}; // Object to store validation errors
    let isValid = true; // Flag to track overall validity of the form

    // Validate name field
    if (!formData.name) {
      newErrors.name = 'Name is required.'; // Show error message if the name is empty
      isValid = false;
    }
    // Validate position field
    if (!formData.position) {
      newErrors.position = 'Position is required.';
      isValid = false;
    }
    // Validate department field
    if (!formData.department) {
      newErrors.department = 'Department is required.';
      isValid = false;
    }
    // Validate email field
    if (!formData.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.'; // Regular expression to check for valid email format
      isValid = false;
    }
    // Validate phone number field
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits.'; // Ensure phone number has exactly 10 digits
      isValid = false;
    }

    setErrors(newErrors); // Update error state with validation results
    return isValid; // Return true if the form is valid, otherwise false
  };

  // Handle form submission (update employee data)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (validateForm()) { // Only submit if the form is valid
      try {
        // Make PUT request to update employee data on the server
        const response = await fetch(`http://localhost:5000/employees/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Send form data as JSON
        });

        if (response.ok) {
          setFeedback('Employee details updated successfully!'); // Success feedback
          setTimeout(() => {
            navigate('/employees'); // Redirect to employees list after 2 seconds
          }, 2000);
        } else {
          setFeedback('Failed to update employee. Please try again.'); // Error feedback
        }
      } catch (error) {
        setFeedback('Error connecting to the server.'); // Error feedback if the request fails
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Edit Employee</h1>

        {/* Form for editing employee details */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          {/* Name */}
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-gray-700 font-semibold flex items-center gap-2"
            >
              <FaUser /> Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border-b border-gray-300 py-2 px-4 w-full"
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p> // Show error message if any
            )}
          </div>

          {/* Position */}
          <div className="flex flex-col">
            <label
              htmlFor="position"
              className="text-gray-700 font-semibold flex items-center gap-2"
            >
              <FaBriefcase /> Position
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="border-b border-gray-300 py-2 px-4 w-full"
              placeholder="Enter position"
            />
            {errors.position && (
              <p className="text-red-500 text-sm">{errors.position}</p>
            )}
          </div>

          {/* Department */}
          <div className="flex flex-col">
            <label
              htmlFor="department"
              className="text-gray-700 font-semibold flex items-center gap-2"
            >
              <FaBuilding /> Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="border-b border-gray-300 py-2 px-4 w-full"
              placeholder="Enter department"
            />
            {errors.department && (
              <p className="text-red-500 text-sm">{errors.department}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-gray-700 font-semibold flex items-center gap-2"
            >
              <FaEnvelope /> Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border-b border-gray-300 py-2 px-4 w-full"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="text-gray-700 font-semibold flex items-center gap-2"
            >
              <FaPhone /> Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border-b border-gray-300 py-2 px-4 w-full"
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Feedback Message */}
          {feedback && (
            <p
              className={`text-lg font-semibold ${feedback.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}
            >
              {feedback}
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-6 mt-8">
            <button
              type="submit"
              className="px-6 py-3 text-lg text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-all"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate('/employees')}
              className="px-6 py-3 text-lg text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
