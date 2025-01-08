import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ onLogout }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-gray-800 shadow-md">
        <Header />
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className="w-32 bg-gray-100 shadow-lg sm:hidden"
          aria-label="Sidebar"
        >
          <Sidebar />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        <button onClick={onLogout} className="text-red-500">
          Logout
        </button>
      </footer>
    </div>
  );
};

export default Layout;
