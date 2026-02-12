import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-50 to-white">
      {/* Hero Section with Image */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
              Discover Your <span className="text-pink-600">Natural Beauty</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Premium beauty products delivered right to your doorstep. 
              Shop skincare, makeup, and haircare essentials.
            </p>
            <div className="flex gap-4">
              <Link 
                to="/products"
                className="bg-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-pink-700 transition shadow-lg"
              >
                Shop Now
              </Link>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80" 
              alt="Beauty Products" 
              className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <p className="text-3xl font-bold text-pink-600">24/7</p>
              <p className="text-gray-600">Customer Support</p>
            </div>
          </div>
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
