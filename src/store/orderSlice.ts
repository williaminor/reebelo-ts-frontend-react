// src/redux/orderSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getOrders,
  updateOrderStatus,
  createOrder,
} from "../services/orderApiService";
import { Order } from "../types/types";

interface OrderState {
  items: Order[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

const initialState: OrderState = {
  items: [],
  loading: false,
  error: null,
  status: "idle",
  currentPage: 1,
  totalItems: 0,
  itemsPerPage: 5,
};

export const fetchOrders = createAsyncThunk<
  { orders: Order[]; totalItems: number },
  { page: number; limit: number }
>("orders/fetchOrders", async ({ page, limit }) => {
  const response = await getOrders(page, limit);

  return {
    orders: response.orders,
    totalItems: response.totalItems,
  };
});

export const createNewOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData: Order) => {
    const response = await createOrder(orderData);
    return response.data;
  }
);

export const updateOrderStatusThunk = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ orderId, status }: { orderId: string; status: string }) => {
    const response = await updateOrderStatus(orderId, status);
    return response.data;
  }
);

// Order slice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.orders;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch orders";
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (o) => o._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { setCurrentPage } = orderSlice.actions;

export default orderSlice.reducer;
