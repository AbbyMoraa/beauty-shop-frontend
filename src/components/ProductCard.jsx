import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <span className="text-xs text-pink-600 font-semibold">{product.category_name}</span>
          <h3 className="text-lg font-bold text-gray-800 mt-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl font-bold text-pink-600">KSh {product.price}</span>
            <span className="text-sm text-gray-500">{product.stock} in stock</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
