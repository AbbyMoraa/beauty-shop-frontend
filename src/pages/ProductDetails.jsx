import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../features/products/productSlice';
import { addToCart } from '../features/cart/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart(selectedProduct));
    alert('Product added to cart!');
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-600">Error: {error}</div>;
  if (!selectedProduct) return null;

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-pink-600 hover:text-pink-700 flex items-center gap-2"
        >
          ← Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div>
              <img
                src={selectedProduct.image_url}
                alt={selectedProduct.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>

            <div>
              <span className="text-sm text-pink-600 font-semibold">{selectedProduct.category_name}</span>
              <h1 className="text-3xl font-bold text-gray-800 mt-2">{selectedProduct.name}</h1>
              <p className="text-gray-600 mt-4">{selectedProduct.description}</p>

              <div className="mt-6">
                <span className="text-4xl font-bold text-pink-600">KSh {selectedProduct.price}</span>
              </div>

              <div className="mt-4">
                <span className={`text-sm ${selectedProduct.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedProduct.stock > 0 ? `${selectedProduct.stock} in stock` : 'Out of stock'}
                </span>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={selectedProduct.stock === 0}
                className={`mt-8 w-full py-3 rounded-lg font-semibold ${
                  selectedProduct.stock > 0
                    ? 'bg-pink-600 text-white hover:bg-pink-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
