import { useEffect, useState } from "react";
import api from "../utils/axios";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCart(res.data);
    } catch {
      alert("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await api.post("/cart", { product_id: productId, quantity });
      fetchCart();
    } catch {
      alert("Failed to update cart");
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.post("/cart", { product_id: productId, quantity: 0 });
      fetchCart();
    } catch {
      alert("Failed to remove item");
    }
  };

  if (loading) return <p className="text-gray-600">Loading cart...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Cart is empty</p>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-pink-100">
                <th className="p-2 text-left">Product</th>
                <th className="p-2 text-right">Price</th>
                <th className="p-2 text-center">Quantity</th>
                <th className="p-2 text-right">Total</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product_id} className="border-t">
                  <td className="p-2">{item.product_name}</td>
                  <td className="p-2 text-right">${item.price.toFixed(2)}</td>
                  <td className="p-2 text-center">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.product_id, parseInt(e.target.value))
                      }
                      className="w-16 border rounded p-1 text-center"
                    />
                  </td>
                  <td className="p-2 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => removeItem(item.product_id)}
                      className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <a href="/checkout" className="block">
            <button
              disabled={cart.length === 0}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                cart.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-pink-500 text-white hover:bg-pink-600"
              }`}
            >
              Proceed to Checkout
            </button>
          </a>
        </div>
      )}
    </div>
  );
}