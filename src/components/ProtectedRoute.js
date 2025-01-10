import React from 'react';
import { Navigate } from 'react-router-dom';

// ProtectedRoute Component
// A higher-order component used to protect certain routes based on user authentication and role.
const ProtectedRoute = ({ user, role, children }) => {
  // Check if the user is authenticated
  if (!user) {
    // If the user is not authenticated, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  // Check if the user has the correct role (if a role is provided)
  if (role && user.role !== role) {
    // If the user's role does not match the required role, redirect them to the dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // If the user is authenticated and has the required role, render the children (protected content)
  return children;
};

export default ProtectedRoute;
