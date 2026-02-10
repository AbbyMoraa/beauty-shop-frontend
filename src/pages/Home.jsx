import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getCategories } from '../features/products/productSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { products, categories, loading, error } = useSelector((state) => state.products);
  
  const [filters, setFilters] = useState({
    category_id: '',
    search: '',
    min_price: '',
    max_price: '',
  });

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleApplyFilters = () => {
    const activeFilters = {};
    if (filters.category_id) activeFilters.category_id = filters.category_id;
    if (filters.search) activeFilters.search = filters.search;
    if (filters.min_price) activeFilters.min_price = filters.min_price;
    if (filters.max_price) activeFilters.max_price = filters.max_price;
    dispatch(getProducts(activeFilters));
  };

  const handleClearFilters = () => {
    setFilters({ category_id: '', search: '', min_price: '', max_price: '' });
    dispatch(getProducts());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Beauty Shop</h1>
          <p className="text-lg">Discover amazing beauty products</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="search"
              placeholder="Search products..."
              value={filters.search}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <select
              name="category_id"
              value={filters.category_id}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <input
              type="number"
              name="min_price"
              placeholder="Min Price"
              value={filters.min_price}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="number"
              name="max_price"
              placeholder="Max Price"
              value={filters.max_price}
              onChange={handleFilterChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div className="flex gap-4 mt-4">
            <button
              onClick={handleApplyFilters}
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClearFilters}
              className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => {
              setFilters({ ...filters, category_id: '' });
              dispatch(getProducts());
            }}
            className={`px-6 py-2 rounded-full whitespace-nowrap ${
              !filters.category_id ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 border'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilters({ ...filters, category_id: cat.id });
                dispatch(getProducts({ category_id: cat.id }));
              }}
              className={`px-6 py-2 rounded-full whitespace-nowrap ${
                filters.category_id === cat.id ? 'bg-pink-600 text-white' : 'bg-white text-gray-700 border'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Loading & Error States */}
        {loading && <div className="text-center py-12 text-gray-600">Loading products...</div>}
        {error && <div className="text-center py-12 text-red-600">Error: {error}</div>}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-gray-600">
                No products found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

