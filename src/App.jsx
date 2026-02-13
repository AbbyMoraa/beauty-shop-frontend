import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/auth/authSlice";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderConfirmation from "./pages/payment/OrderConfirmation";
import ApiTest from "./pages/ApiTest";
import AdminDashboard from "./admin/pages/AdminDashboard.jsx";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const restoreUser = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          const response = await axios.get('https://beauty-shop-backend-wegm.onrender.com/me', {
            headers: { Authorization: `Bearer ${savedToken}` }
          });
          dispatch(setUser(response.data));
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
    };
    restoreUser();
  }, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            {/* Public pages */}
            <Route path="/" element={<Landing />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/api-test" element={<ApiTest />} />
            
            {/* Admin Dashboard */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
