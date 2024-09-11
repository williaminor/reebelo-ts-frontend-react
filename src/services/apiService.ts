import axios from "axios";
import {
  Product,
  Order,
  TrackingInfo,
  OrderResponse,
  ProductsResponse,
} from "../types/types";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// fetch all products
export const getProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

// create a product
export const createProduct = async (productData: {
  name: string;
  price: number;
  stockQuantity: number;
}): Promise<Product> => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (err) {
    console.error("Error creating product:", err);
    throw err;
  }
};

// create an order
export const createOrder = async (orderData: {
  products: Order[];
}): Promise<OrderResponse> => {
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
