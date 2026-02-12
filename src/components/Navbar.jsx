import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  return (
    <nav className="bg-pink-100 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-pink-600">
            BEAUTY HAVEN
          </Link>
          <div className="flex gap-6 items-center">
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
      </div>
    </nav>
  );
};

export default Navbar;
