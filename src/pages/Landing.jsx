import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-50 to-white flex items-center py-16">
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-pink-600">Beauty Shop</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover amazing beauty products delivered right to your doorstep. 
            Shop skincare, makeup, and haircare products at your convenience.
          </p>
          <Link 
            to="/products"
            className="inline-block bg-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-pink-700 transition shadow-lg"
          >
            Search Products
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">💄</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Quality Products</h3>
            <p className="text-gray-600">Wide variety of beauty products for all your needs</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Get your products delivered right to your doorstep</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-4">💳</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Payment</h3>
            <p className="text-gray-600">Safe and secure checkout process</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
