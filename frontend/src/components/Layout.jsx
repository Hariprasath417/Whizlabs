// Main layout component with navigation bar
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link to="/" className="flex items-center gap-2 sm:gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-1.5 sm:p-2 rounded-lg">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                <span className="hidden sm:inline">Inventory Management</span>
                <span className="sm:hidden">Inventory</span>
              </span>
            </Link>
            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                to="/"
                className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  isActive('/') ? 'bg-blue-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="hidden sm:inline">All Items</span>
                <span className="sm:hidden">Items</span>
              </Link>
              <Link
                to="/items/new"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-800 transition-all font-semibold text-xs sm:text-sm sm:hidden"
              >
                <span className="sm:hidden">Add</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
