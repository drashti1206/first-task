import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Layout from './components/Layout'; 
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import Settings from './pages/Settings';
import Employeedetail from './components/Employeedetail';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import EmployeeProvider from "./context/EmployeeContext";
import './App.css'; 

const App = () => {
  // Initialize state by loading employees from localStorage, or default to an empty array
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees"));
    return storedEmployees || [
    ];
  });

  // Update localStorage whenever the employees state changes
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);
  // Function to add a new employee
  const addEmployee = (newEmployee) => {
    console.log("Adding Employee:", newEmployee);
    setEmployees((prev) => [...prev, newEmployee]);
  };
  return (
    <EmployeeProvider> 
      <Router>
        <Layout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/employees/:id" element={<Employeedetail/>}/>
            <Route path="/edit/:id" element={<EditEmployee/>}/>
            <Route
              path="/employees"
              element={<Employees employees={employees} />}
            />
            <Route
              path="/add-employee"
              element={<AddEmployee addEmployee={addEmployee} />}
            />
          </Routes>
        </Layout>
      </Router>
    </EmployeeProvider>

  );
};

export default App;
