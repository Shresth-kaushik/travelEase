import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, Home, LogOut } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = isAuthenticated && user?.role === 'organizer'
    ? [
        { name: 'Home', path: '/' }, 
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Upcoming Trips', path: '/upcoming-trips' },
        ...(isAuthenticated
          ? [{ name: 'Dashboard', path: '/dashboard' }]
          : [
              { name: 'Login', path: '/login' },
              { name: 'Register', path: '/register' },
            ]),
      ];

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="text-2xl font-bold text-purple-900 transition-colors duration-300">
            TravelEase
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-gray-700 hover:text-purple-900 transition-colors duration-300 ${
                  location.pathname === item.path ? 'font-semibold' : ''
                }`}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.name}
              </Link>
            ))}
            {isAuthenticated && (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center bg-purple-900 text-white hover:bg-purple-800 px-4 py-2 rounded-full transition-colors duration-300"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-purple-900 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center py-2 text-gray-700 hover:text-purple-900 transition-colors duration-300 ${
                  location.pathname === item.path ? 'font-semibold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.name}
              </Link>
            ))}
            {isAuthenticated && (
              <div className="py-2">
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center text-purple-900 hover:text-purple-800 transition-colors duration-300"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;

