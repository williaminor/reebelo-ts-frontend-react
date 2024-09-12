import axios from "axios";
import { Product, ProductsResponse } from "../types/types";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// fetch products by pagination
export const getProducts = async (
  page: number,
  limit: number
): Promise<ProductsResponse> => {
  try {
    const response = await api.get(`/products?page=${page}&limit=${limit}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

// fetch all products
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get("/products/all");
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

//update product
export const updateProduct = async (
  id: string,
  productData: Omit<Product, "_id">
): Promise<Product> => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (err) {
    console.error("Error updating product:", err);
    throw err;
  }
};

//get product by ID
export const getProductById = async (
  productId: string
): Promise<{ data: Product }> => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching product");
  }
};
