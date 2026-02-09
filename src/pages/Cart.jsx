import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link to="/products" className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-4">
                <div className="flex gap-4">
                  <img src={item.image_url} alt={item.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.category_name}</p>
                    <p className="text-pink-600 font-bold mt-2">KSh {item.price}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-bold text-gray-800">KSh {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 font-semibold"
            >
              Clear Cart
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">KSh {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold text-pink-600">KSh {total.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition font-semibold"
              >
                Proceed to Checkout
              </button>
              <Link to="/products" className="block text-center text-pink-600 mt-4 hover:text-pink-700">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
