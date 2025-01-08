import React, { createContext, useState, useEffect } from 'react';
export const EmployeeContext = createContext();

const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    return storedEmployees || [];
  });

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (newEmployee) =>
    setEmployees((prev) => [...prev, newEmployee]);
  const deleteEmployee = (index) =>
    setEmployees((prev) => prev.filter((_, i) => i !== index));
  const editEmployee = (index, updatedEmployee) =>
    setEmployees((prev) =>
      prev.map((emp, i) => (i === index ? updatedEmployee : emp))
    );
  return (
    <EmployeeContext.Provider
      value={{ employees, addEmployee, deleteEmployee, editEmployee }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
