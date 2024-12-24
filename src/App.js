import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout'; 
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import Settings from './pages/Settings';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import EmployeeProvider from "./context/EmployeeContext";
import './App.css'; 

const App = () => {
  // Initialize state by loading employees from localStorage, or default to an empty array
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees"));
    return storedEmployees || [
      { name: "Drashti Patel", position: "Software Engineer", department: "IT", email: "drashti.patel@example.com", phone: "9824129599" },
      { name: "Divya Patel", position: "Product Manager", department: "Product", email: "divya.patel@example.com", phone: "0987654321" },
      { name: "Keshvi Choksi", position: "Designer", department: "Creative", email: "keshvi.choksi@example.com", phone: "7285033662" },
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
