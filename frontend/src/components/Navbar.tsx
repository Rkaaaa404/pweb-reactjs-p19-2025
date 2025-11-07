import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import aset lokal
import cartIcon from '../assets/shoping-cart.png';

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="bg-bookit-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-bookit-dark">BookIT</span>
            </Link>
            
            {/* Nav Links - Moved inside the left section */}
            <div className="hidden sm:flex sm:space-x-8">
              <Link
                to={isAuthenticated ? "/manage-books" : "/"}
                className="text-bookit-text-medium hover:text-bookit-dark inline-flex items-center text-sm font-medium"
              >
                Katalog
              </Link>
              <Link
                to="/manage-books"
                className="text-bookit-text-medium hover:text-bookit-dark inline-flex items-center text-sm font-medium"
              >
                Manajemen Buku
              </Link>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              // Logged-in state
              <div className="flex items-center space-x-4">
                <button className="p-1">
                  <svg className="h-6 w-6 text-bookit-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <button className="p-1">
                  <img src={cartIcon} alt="Shopping Cart" className="h-6 w-6" />
                </button>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-bookit-white border border-bookit-border">
                    <span className="text-sm text-bookit-primary whitespace-nowrap">
                      {user?.email || 'boyko@gmail.com'}
                    </span>
                    <div className="h-6 w-6 rounded-full bg-bookit-dark flex items-center justify-center">
                      <span className="text-xs text-white">R</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Logged-out state
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-bookit-dark bg-bookit-white hover:bg-gray-50"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-bookit-dark hover:bg-bookit-dark/90 rounded"
                >
                  Daftar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;