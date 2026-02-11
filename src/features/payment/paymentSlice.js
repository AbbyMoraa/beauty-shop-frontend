import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const createAddress = createAsyncThunk(
  "payment/createAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      const response = await api.post("/addresses", addressData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to create address" });
    }
  }
);

export const fetchAddresses = createAsyncThunk(
  "payment/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/addresses");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to fetch addresses" });
    }
  }
);

export const simulatePayment = createAsyncThunk(
  "payment/simulatePayment",
  async (orderId, { rejectWithValue }) => {
    try {
      console.log('📤 Calling POST /payments/simulate with order_id:', orderId);
      const response = await api.post("/payments/simulate", { order_id: orderId });
      console.log('✅ Payment simulation response:', response.data);
      return response.data;
    } catch (err) {
      console.log('❌ Payment simulation error:', err.response?.data);
      return rejectWithValue(err.response?.data || { message: "Payment simulation failed" });
    }
  }
);

export const initiatePayment = createAsyncThunk(
  "payment/initiatePayment",
  async ({ orderId, phoneNumber }, { rejectWithValue }) => {
    try {
      console.log('📤 Calling POST /payments/initiate with:', { orderId, phoneNumber });
      const response = await api.post("/payments/initiate", {
        order_id: orderId,
        phone_number: phoneNumber,
      });
      console.log('✅ Payment initiation response:', response.data);
      return response.data;
    } catch (err) {
      console.log('❌ RAW ERROR OBJECT:', err);
      console.log('❌ ERROR RESPONSE:', err.response);
      console.log('❌ ERROR RESPONSE DATA:', err.response?.data);
      console.log('❌ ERROR RESPONSE STATUS:', err.response?.status);
      console.log('❌ ERROR RESPONSE HEADERS:', err.response?.headers);
      console.log('❌ ERROR MESSAGE:', err.message);
      return rejectWithValue(err.response?.data || { message: "Payment initiation failed" });
    }
  }
);

export const fetchInvoice = createAsyncThunk(
  "payment/fetchInvoice",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/invoices/${orderId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to fetch invoice" });
    }
  }
);

const initialState = {
  addresses: [],
  currentInvoice: null,
  loading: false,
  error: null,
  paymentStatus: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearPaymentStatus: (state) => {
      state.paymentStatus = null;
      state.error = null;
    },
    clearInvoice: (state) => {
      state.currentInvoice = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses.push(action.payload);
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(simulatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(simulatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload;
      })
      .addCase(simulatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(initiatePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiatePayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload;
      })
      .addCase(initiatePayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.currentInvoice = action.payload;
      })
      .addCase(fetchInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearPaymentStatus, clearInvoice } = paymentSlice.actions;
export default paymentSlice.reducer;
