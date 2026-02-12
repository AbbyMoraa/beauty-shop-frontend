import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setIsMenuOpen(false);
  };
  
  return (
    <nav className="bg-pink-100 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-pink-600">
            BEAUTY HAVEN
          </Link>
          
          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-pink-600 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link 
              to="/" 
              className={`text-pink-600 font-bold text-lg transition ${
                location.pathname === '/' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`text-pink-600 font-bold text-lg transition ${
                location.pathname === '/products' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/cart" 
              className={`text-pink-600 font-bold text-lg transition ${
                location.pathname === '/cart' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
              }`}
            >
              Cart
            </Link>
            {user && (
              <Link 
                to="/orders" 
                className={`text-pink-600 font-bold text-lg transition ${
                  location.pathname === '/orders' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                Orders
              </Link>
            )}
            {user && (user.role === 'admin' || user.username === 'abbymoraa876@gmail.com' || user.email === 'abbymoraa876@gmail.com') && (
              <Link 
                to="/admin" 
                className={`text-pink-600 font-bold text-lg transition ${
                  location.pathname === '/admin' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                Admin
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-xl">
                  {user.username ? user.username.charAt(0).toUpperCase() : user.email ? user.email.charAt(0).toUpperCase() : user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <button 
                  onClick={handleLogout} 
                  className="text-pink-600 font-bold text-lg hover:opacity-70 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className={`text-pink-600 font-bold text-lg transition ${
                  location.pathname === '/login' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-pink-600 font-bold text-lg py-2"
            >
              Home
            </Link>
            <Link 
              to="/products" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-pink-600 font-bold text-lg py-2"
            >
              Products
            </Link>
            <Link 
              to="/cart" 
              onClick={() => setIsMenuOpen(false)}
              className="block text-pink-600 font-bold text-lg py-2"
            >
              Cart
            </Link>
            {user && (
              <Link 
                to="/orders" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-pink-600 font-bold text-lg py-2"
              >
                Orders
              </Link>
            )}
            {user && (user.role === 'admin' || user.username === 'abbymoraa876@gmail.com' || user.email === 'abbymoraa876@gmail.com') && (
              <Link 
                to="/admin" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-pink-600 font-bold text-lg py-2"
              >
                Admin
              </Link>
            )}
            {user ? (
              <div className="pt-2 border-t border-pink-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-xl">
                    {user.username ? user.username.charAt(0).toUpperCase() : user.email ? user.email.charAt(0).toUpperCase() : user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-pink-600 font-semibold">{user.username || user.email}</span>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left text-pink-600 font-bold text-lg py-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="block text-pink-600 font-bold text-lg py-2"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
