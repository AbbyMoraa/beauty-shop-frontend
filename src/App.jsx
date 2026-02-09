import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="p-4 bg-white shadow flex gap-6">
        <Link 
          to="/" 
          className="text-pink-500 font-semibold hover:text-pink-700 transition-colors"
        >
          Products
        </Link>
        <Link 
          to="/cart" 
          className="text-pink-500 font-semibold hover:text-pink-700 transition-colors"
        >
          Cart
        </Link>
        <Link 
          to="/checkout" 
          className="text-pink-500 font-semibold hover:text-pink-700 transition-colors"
        >
          Checkout
        </Link>
      </nav>

      {/* Page Content */}
      <main className="p-6 bg-pink-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
