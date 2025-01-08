import React from 'react';
import { useAuth } from '../context/UserContext';

const AdminPanel = () => {
  const { role } = useAuth();

  if (role !== 'admin') {
    return <p>You do not have access to this page.</p>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      {/* Admin-specific content goes here */}
    </div>
  );
};

export default AdminPanel;
