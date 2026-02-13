import axios from "axios";

const api = axios.create({
  baseURL: "https://beauty-shop-backend-wegm.onrender.com",
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log('Token being sent:', token.substring(0, 20) + '...');
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  return config;
});

export default api;