import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import AddDepartment from './pages/AddDepartment';
import Settings from './pages/Settings';
import Employeedetail from './components/Employeedetail';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';
import EmployeeProvider from './context/EmployeeContext';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute'; // For role-based protection
import './App.css';

const App = () => {
  const [employees, setEmployees] = useState(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees'));
    return storedEmployees || [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [user, setUser] = useState(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return storedUser || null;
  });

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (newEmployee) => {
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const handleLogin = (user) => {
    setUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <EmployeeProvider>
      <Router>
        <Routes>
          {/* Login Route */}
          {!isAuthenticated && (
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
            </>
          )}

          {/* Protected Routes */}
          {isAuthenticated ? (
            <Route path="/" element={<Layout onLogout={handleLogout} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/add-department" element={<AddDepartment />} />
              <Route
                path="/settings"
                element={<Settings user={user} logout={handleLogout} />}
              />
              <Route
                path="/employees"
                element={<Employees employees={employees} />}
              />
              <Route path="/employees/:id" element={<Employeedetail />} />
              {/* Admin-only routes */}
              <Route
                path="/edit/:id"
                element={
                  <ProtectedRoute user={user} role="admin">
                    <EditEmployee />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-employee"
                element={
                  <ProtectedRoute user={user} role="admin">
                    <AddEmployee addEmployee={addEmployee} />
                  </ProtectedRoute>
                }
              />
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
