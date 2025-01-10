import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

// Layout Component
// Provides the overall structure of the application, including the header, sidebar, main content area, and footer.
const Layout = ({ onLogout }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      {/* Stays fixed at the top with a shadow for better visibility */}
      <header className="sticky top-0 z-30 bg-gray-800 shadow-md">
        <Header /> {/* Includes navigation and branding */}
      </header>

      {/* Main Content Section */}
      <div className="flex flex-1">
        {/* Sidebar Section */}
        {/* Contains additional navigation options, hidden on small screens */}
        <aside
          className="w-32 bg-gray-100 shadow-lg sm:hidden"
          aria-label="Sidebar"
        >
          <Sidebar />
        </aside>

        {/* Dynamic Main Content */}
        {/* Content rendered here is determined by the current route via the <Outlet /> component */}
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer Section */}
      {/* Includes the logout button for user authentication control */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <button
          onClick={onLogout} // Triggered to log the user out of the application
          className="text-red-500"
        >
          Logout
        </button>
      </footer>
    </div>
  );
};

export default Layout;
