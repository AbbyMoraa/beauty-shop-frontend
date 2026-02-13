import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const createAddress = createAsyncThunk(
  "payment/createAddress",
  async (addressData, { rejectWithValue }) => {
    try {
      // Backend JWT bug - mock success for demo
      return { id: Date.now(), ...addressData };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to create address" });
    }
  }
);

export const fetchAddresses = createAsyncThunk(
  "payment/fetchAddresses",
  async (_, { rejectWithValue }) => {
    try {
      // Backend JWT bug - return empty array for demo
      return [];
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to fetch addresses" });
    }
  }
);

export const simulatePayment = createAsyncThunk(
  "payment/simulatePayment",
  async (orderId, { rejectWithValue }) => {
    try {
      // Mock successful payment for demo
      return { status: 'success', message: 'Payment completed successfully', order_id: orderId };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Payment simulation failed" });
    }
  }
);

export const initiatePayment = createAsyncThunk(
  "payment/initiatePayment",
  async ({ orderId, phoneNumber }, { rejectWithValue }) => {
    try {
      // Mock M-Pesa initiation for demo
      return { status: 'pending', message: 'STK push sent to ' + phoneNumber, order_id: orderId };
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Payment initiation failed" });
    }
  }
);

export const fetchInvoice = createAsyncThunk(
  "payment/fetchInvoice",
  async (orderId, { rejectWithValue }) => {
    try {
      // Mock invoice for demo
      return {
        invoice_number: `INV-${orderId}`,
        order_id: orderId,
        total_amount: 2500,
        status: 'paid',
        created_at: new Date().toISOString(),
        items: [
          { name: 'Sample Product', quantity: 1, price: 2500 }
        ]
      };
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
