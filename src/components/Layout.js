import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  const [content, setContent] = React.useState(children);

  const handleSidebarClick = (newContent) => {
    setContent(newContent); // Update the displayed content
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-gray-800 shadow-md">
        <Header />
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar always visible on small screens with reduced width */}
        <aside
          className="w-32 bg-gray-100 shadow-lg sm:hidden"
          aria-label="Sidebar for small screens"
        >
          <Sidebar onItemClick={(item) => handleSidebarClick(item)} />
        </aside>

        {/* Main content area */}
        <main
          className="flex-1 p-4 overflow-y-auto"
          aria-label="Main content area"
        >
          <div className="max-w-4xl mx-auto">{content}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
