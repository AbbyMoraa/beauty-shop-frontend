import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'https://beauty-shop-backend-wegm.onrender.com';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
