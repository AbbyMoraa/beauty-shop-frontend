import { useEffect, useState } from "react";
import api from "../utils/axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch {
      alert("Failed to load products");
    }
  };

  const addToCart = async (productId) => {
    try {
      await api.post("/cart", { product_id: productId, quantity: 1 });
      alert("Added to cart!");
    } catch {
      alert("Failed to add to cart");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">Our Products</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <li
            key={p.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{p.name}</h3>
              <p className="text-pink-500 font-bold mt-2">${p.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => addToCart(p.id)}
              className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition"
            >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}