import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaBriefcase,
  FaBuilding,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
} from 'react-icons/fa';

const AddEmployee = () => {
  // State to store form data for employee details
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
    hireDate: '',
  });

  // State to manage validation errors
  const [errors, setErrors] = useState({});

  // State to manage feedback messages for success or failure
  const [feedback, setFeedback] = useState('');

  // State to store dynamic department list fetched from the server
  const [departments, setDepartments] = useState([]);

  // Navigation hook for redirecting after successful submission
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch departments from the backend when the component mounts
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:5000/departments');
        if (response.ok) {
          const data = await response.json();
          setDepartments(data); // Store departments in state
        } else {
          console.error('Failed to fetch departments');
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments(); // Fetch departments only once on component mount
  }, []); // Empty dependency array ensures this effect runs once

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update formData state with the changed value
    });
  };

  // Validate form fields and return whether the form is valid or not
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate each field and add error messages if needed
    if (!formData.name) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }
    if (!formData.position) {
      newErrors.position = 'Position is required.';
      isValid = false;
    }
    if (!formData.department) {
      newErrors.department = 'Department is required.';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits.';
      isValid = false;
    }
    if (!formData.hireDate) {
      newErrors.hireDate = 'Hire date is required.';
      isValid = false;
    }

    setErrors(newErrors); // Store validation errors
    return isValid; // Return whether the form is valid
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (validateForm()) {
      // Only proceed if form is valid
      try {
        // Send POST request to add new employee
        const response = await fetch('http://localhost:5000/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Send form data as JSON
        });

        if (response.ok) {
          setFeedback('Employee added successfully!');
          // Redirect to employee list after 2 seconds
          setTimeout(() => {
            navigate('/employees');
          }, 2000);
        } else {
          setFeedback('Failed to add employee. Please try again.');
        }
      } catch (error) {
        setFeedback('Error connecting to the server.');
      }
    }
  };

  return (
    <div className="flex h-screen ">
      <div className="flex-1 bg-gray-100 overflow-y-auto p-4 md:p-6 transition-opacity duration-300 opacity-100">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Add Employee</h1>

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
              className="border-b border-gray-300 py-2 px-4 w-1/2"
              placeholder="Enter name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
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
              className="border-b border-gray-300 py-2 px-4 w-1/2"
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
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="border-b border-gray-300 py-2 px-4 w-1/2"
            >
              <option value="" disabled>
                Select a department
              </option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.name}>
                  {dept.name}
                </option>
              ))}
            </select>
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
              className="border-b border-gray-300 py-2 px-4 w-1/2"
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
              className="border-b border-gray-300 py-2 px-4 w-1/2"
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone}</p>
            )}
          </div>

          {/* Hire Date */}
          <div className="flex flex-col">
            <label
              htmlFor="hireDate"
              className="text-gray-700 font-semibold flex items-center gap-2"
            >
              <FaCalendarAlt /> Hire Date
            </label>
            <input
              type="date"
              id="hireDate"
              name="hireDate"
              value={formData.hireDate}
              onChange={handleChange}
              className="border-b border-gray-300 py-2 px-4 w-1/2"
            />
            {errors.hireDate && (
              <p className="text-red-500 text-sm">{errors.hireDate}</p>
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
          <div className="flex flex-col sm:flex-row sm:justify-start gap-6 mt-8">
            <button
              type="submit"
              className="px-6 py-3 text-lg text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-all"
            >
              Submit
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

export default AddEmployee;
