import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Hamburger Menu Button */}
      <button
        className="md:hidden p-2 text-white bg-gray-800 fixed top-0 left-0 z-50"
        onClick={toggleSidebar}
      >
        <i className="fas fa-bars"></i>
      </button>

      {/* Sidebar Section */}
      <div
        className={`fixed top-0 left-0 z-40 h-full w-3/4 bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 md:w-48`}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(false)} // Close sidebar when a link is clicked
        />
      </div>
      {/* Main Content Area */}
      <div
        className={`flex-1 bg-gray-50 overflow-y-auto p-4 md:p-6 transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="text-center text-lg font-semibold md:hidden">
          Employee Management
        </div>
        {/* ToastContainer placed inside main content area */}
        <ToastContainer />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
