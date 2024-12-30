import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import Login from './components/Login';
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = JSON.parse(localStorage.getItem("employees"));
    return storedEmployees || [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  const [user, setUser] = useState(null); // Define user state

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (newEmployee) => {
    console.log("Adding Employee:", newEmployee);
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const handleLogin = () => {
    // Set a dummy user on successful login
    const loggedInUser = { username: "admin", role: "Admin" };
    setUser(loggedInUser);
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setUser(null); // Clear the user state on logout
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <EmployeeProvider>
      <Router>
        <Routes>
          {/* Login Route */}
          {!isAuthenticated && <Route path="/login" element={<Login onLogin={handleLogin} />} />}

          {/* Protected Routes */}
          {isAuthenticated ? (
            <Route path="/" element={<Layout onLogout={handleLogout} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/settings" element={<Settings user={user} logout={handleLogout} />} />
              <Route path="/employees" element={<Employees employees={employees} />} />
              <Route path="/employees/:id" element={<Employeedetail />} />
              <Route path="/edit/:id" element={<EditEmployee />} />
              <Route path="/add-employee" element={<AddEmployee addEmployee={addEmployee} />} />
            </Route>
          ) : (
            // Redirect to login if not authenticated
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Router>
    </EmployeeProvider>
  );
};

export default App;
