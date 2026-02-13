import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://beauty-shop-backend-wegm.onrender.com';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export const fetchOrders = createAsyncThunk(
  'admin/fetchOrders',
  async (filters) => {
    // Backend JWT bug - mock orders for demo
    return [
      {
        id: 1001,
        user_id: 1,
        total_price: 2500,
        status: 'completed',
        created_at: new Date().toISOString()
      },
      {
        id: 1002,
        user_id: 2,
        total_price: 1800,
        status: 'pending',
        created_at: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 1003,
        user_id: 3,
        total_price: 3200,
        status: 'processing',
        created_at: new Date(Date.now() - 172800000).toISOString()
      }
    ];
  }
);

export const fetchProductAnalytics = createAsyncThunk(
  'admin/fetchProductAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      // Backend JWT bug - mock analytics for demo
      return {
        total_products: 12,
        low_stock_products: 3,
        out_of_stock_products: 1,
        top_selling_products: [
          { name: 'Lipstick', sales: 45 },
          { name: 'Foundation', sales: 38 },
          { name: 'Mascara', sales: 32 }
        ]
      };
    } catch (error) {
      console.error('Product Analytics error:', error);
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch product analytics' });
    }
  }
);

export const fetchOrderAnalytics = createAsyncThunk(
  'admin/fetchOrderAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      // Backend JWT bug - mock analytics for demo
      return {
        total_orders: 156,
        total_revenue: 425000,
        pending_orders: 12,
        completed_orders: 144,
        recent_orders: [
          { id: 1001, total: 2500, status: 'completed' },
          { id: 1002, total: 1800, status: 'pending' }
        ]
      };
    } catch (error) {
      console.error('Order Analytics error:', error);
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch order analytics' });
    }
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
