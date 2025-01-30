import React from 'react';
import { useAuth } from '../context/UserContext';

// This component restricts access to admin users only.
const AdminPanel = () => {
  const { role } = useAuth(); // Retrieves the role of the current user from the Auth context

  if (role !== 'admin') {
    return <p>You do not have access to this page.</p>;
  }

  // Render admin-specific content for authorized users
  return (
    <div>
      <h1>Admin Panel</h1>
      {/* Add any admin-specific functionality or content below */}
    </div>
  );
};

export default AdminPanel;
