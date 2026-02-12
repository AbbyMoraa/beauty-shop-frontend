import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const fetchOrders = createAsyncThunk(
  'admin/fetchOrders',
  async (filters) => {
    const params = new URLSearchParams();
    if (filters.date) params.append('date', filters.date);
    if (filters.category) params.append('category', filters.category);
    
    const response = await axios.get(`${API_URL}/orders?${params}`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
);

export const fetchProductAnalytics = createAsyncThunk(
  'admin/fetchProductAnalytics',
  async () => {
    const response = await axios.get(`${API_URL}/analytics/products`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
);

export const fetchOrderAnalytics = createAsyncThunk(
  'admin/fetchOrderAnalytics',
  async () => {
    const response = await axios.get(`${API_URL}/analytics/orders`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
);

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async () => {
    const response = await axios.get(`${API_URL}/users`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
);

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async (user) => {
    const response = await axios.put(`${API_URL}/users/${user.id}`, user, {
      headers: getAuthHeader()
    });
    return response.data;
  }
);

export const disableUser = createAsyncThunk(
  'admin/disableUser',
  async (userId) => {
    await axios.delete(`${API_URL}/users/${userId}`, {
      headers: getAuthHeader()
    });
    return userId;
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    orders: [],
    users: [],
    productAnalytics: null,
    orderAnalytics: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductAnalytics.fulfilled, (state, action) => {
        state.productAnalytics = action.payload;
      })
      .addCase(fetchOrderAnalytics.fulfilled, (state, action) => {
        state.orderAnalytics = action.payload;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        // Remove duplicates based on ID
        const uniqueUsers = Array.from(
          new Map(action.payload.map(user => [user.id, user])).values()
        );
        state.users = uniqueUsers;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u.id === action.payload.user_id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(disableUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u.id !== action.payload);
      });
  }
});

export default adminSlice.reducer;
