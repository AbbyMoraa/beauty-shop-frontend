import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-pink-100 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-pink-600">
            BEAUTY SHOP
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
            <Link 
              to="/login" 
              className={`text-pink-600 font-bold text-lg transition ${
                location.pathname === '/login' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
              }`}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
