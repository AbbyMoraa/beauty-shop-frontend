const API_URL = 'https://beauty-shop-backend-wegm.onrender.com';

export const fetchProducts = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.category_id) params.append('category_id', filters.category_id);
  if (filters.search) params.append('search', filters.search);
  if (filters.min_price) params.append('min_price', filters.min_price);
  if (filters.max_price) params.append('max_price', filters.max_price);
  
  const response = await fetch(`${API_URL}/products?${params}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
};
