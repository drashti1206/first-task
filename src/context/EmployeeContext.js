import React, { createContext, useState, useEffect } from 'react';

// Create a Context for managing employees globally
export const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  // State to store the list of employees. It initializes with stored data in localStorage, if available.
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    return storedEmployees || []; // If no data in localStorage, fallback to an empty array
  });

  // Effect hook to store the employee data in localStorage whenever the employees state changes
  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]); // Runs every time the `employees` state changes

  // Function to add a new employee to the state
  const addEmployee = (newEmployee) =>
    setEmployees((prev) => [...prev, newEmployee]); // Adds the new employee to the array

  // Function to delete an employee from the state by index
  const deleteEmployee = (index) =>
    setEmployees((prev) => prev.filter((_, i) => i !== index)); // Filters out the employee at the given index

  // Function to edit an employee's details in the state by index
  const editEmployee = (index, updatedEmployee) =>
    setEmployees((prev) =>
      prev.map((emp, i) => (i === index ? updatedEmployee : emp)) // Updates the employee if the index matches
    );

  return (
    // The EmployeeContext.Provider makes the state and functions available to any child components
    <EmployeeContext.Provider
      value={{ employees, addEmployee, deleteEmployee, editEmployee }}
    >
      {children} {/* Renders the children components inside the provider */}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
