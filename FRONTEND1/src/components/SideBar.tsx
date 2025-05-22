import  { useState, useEffect } from 'react';
import { FiMenu, FiX, FiHome, FiSettings, FiUser, FiLogOut } from 'react-icons/fi';
import { Button } from './ui/button';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile view on component mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(true); // Always open on desktop by default
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { icon: <FiHome size={20} />, label: 'Home', path: '/' },
    { icon: <FiUser size={20} />, label: 'Profile', path: '/profile' },
    { icon: <FiSettings size={20} />, label: 'Settings', path: '/settings' },
    { icon: <FiLogOut size={20} />, label: 'Logout', path: '/logout' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed md:relative z-30 w-64 bg-white shadow-lg transform transition-all duration-300 ease-in-out 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold text-gray-800">My App</h1>
          <Button 
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <FiX size={24} />
          </Button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.path}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-blue-600"
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Navbar with toggle button */}
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <Button  
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <FiMenu size={24} />
          </Button>
          <h2 className="text-lg font-semibold text-gray-800 ml-4 inline-block">Dashboard</h2>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {/* Your page content goes here */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-medium mb-4">Welcome to your dashboard</h3>
            <p className="text-gray-600">
              Click the menu icon to toggle the sidebar. On mobile, the sidebar will overlay the content,
              while on desktop it will push the content.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;