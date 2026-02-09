import { useEffect, useState } from "react";
import api from "../utils/axios";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
      const sum = res.data.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      setTotal(sum);
    } catch {
      alert("Failed to load cart");
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await api.post("/checkout");
      alert(`Order placed! Order ID: ${res.data.order_id}, Total: $${res.data.total}`);
      setCart([]);
      setTotal(0);
    } catch {
      alert("Checkout failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Checkout</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">No items to checkout</p>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-pink-100">
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-center">Qty</th>
                <th className="p-2 text-right">Price</th>
                <th className="p-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product_id} className="border-t">
                  <td className="p-2">{item.product_name}</td>
                  <td className="p-2 text-center">{item.quantity}</td>
                  <td className="p-2 text-right">${item.price.toFixed(2)}</td>
                  <td className="p-2 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Total: <span className="text-pink-600">${total.toFixed(2)}</span>
          </h3>

          <button
            onClick={handleCheckout}
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition"
          >
            Confirm Checkout
          </button>
        </div>
      )}
    </div>
  );
}