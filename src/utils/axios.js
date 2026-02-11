import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log('🔑 Token being sent:', token);
  console.log('🌐 Full URL:', api.defaults.baseURL + config.url);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('✅ Authorization header set:', config.headers.Authorization);
  } else {
    console.log('❌ No token found in localStorage');
  }
  console.log('📤 Request config:', {
    url: config.url,
    method: config.method,
    headers: config.headers,
    data: config.data
  });
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('✅ Response success:', response.status);
    return response;
  },
  (error) => {
    console.log('❌ Response error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;