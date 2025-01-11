import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaUser,
  FaBriefcase,
  FaBuilding,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';
import axios from 'axios';

const EditEmployee = () => {
  const { id } = useParams(); // Get employee ID from route params
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: '',
    email: '',
    phone: '',
  }); // State to store form data
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/employees/${id}`
        );
        setFormData(response.data); // Directly set data to formData
      } catch (error) {
        setFeedback('Failed to fetch employee data.');
      }
    };
    fetchEmployeeData(); // Fetch employee data based on the `id` parameter
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update state with form field value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

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

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`http://localhost:5000/employees/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setFeedback('Employee details updated successfully!');
          setTimeout(() => {
            navigate('/employees'); // Redirect to employee list after success
          }, 2000);
        } else {
          setFeedback('Failed to update employee.');
        }
      } catch (error) {
        setFeedback('Error connecting to the server.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-gray-100 p-4 sm:p-6">
      <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Edit Employee</h1>
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

          {feedback && (
            <p
              className={`text-lg font-semibold ${
                feedback.includes('successfully')
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {feedback}
            </p>
          )}

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
