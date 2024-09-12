import axios from "axios";
import { Order, TrackingInfo, OrderResponse } from "../types/types";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// get orders
export const getOrders = async (): Promise<{ data: Order[] }> => {
  try {
    const response = await api.get("orders");
    console.log(response);
    return response.data;
  } catch (err) {
    console.error("Error fetching orders:", err);
    throw err;
  }
};

// Get order by ID
export const getOrderById = async (orderId: string): Promise<OrderResponse> => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching order");
  }
};

// create an order
export const createOrder = async (orderData: Order): Promise<OrderResponse> => {
  try {
    const response = await api.post("/orders", orderData);
    return response.data;
  } catch (err) {
    console.error("Error creating order:", err);
    throw err;
  }
};

// update order status
export const updateOrderStatus = async (
  orderId: string,
  status: string
): Promise<OrderResponse> => {
  try {
    const response = await api.patch(`/orders/${orderId}/status`, { status });
    return response.data;
  } catch (err) {
    console.error("Error updating order status:", err);
    throw err;
  }
};

//update shipping information
export const updateOrderShipping = async (
  orderId: string,
  tracking: TrackingInfo
): Promise<OrderResponse> => {
  try {
    const response = await api.put(`/orders/${orderId}/shipping`, { tracking });
    return response.data;
  } catch (err) {
    console.error("Error updating order shipping information:", err);
    throw err;
  }
};
