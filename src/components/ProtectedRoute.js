import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ user, role, children }) => {
  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Redirect if the user's role does not match the required role
    return <Navigate to="/dashboard" replace />;
  }

  // Render the children components if access is granted
  return children;
};

export default ProtectedRoute;
