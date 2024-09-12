import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  createProduct,
  updateProduct,
} from "../services/productApiService";
import { Product } from "../types/types";

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
  status: "idle",
  currentPage: 1,
  totalItems: 0,
  itemsPerPage: 10,
};

export const fetchProducts = createAsyncThunk<
  {
    products: Product[];
    totalItems: number;
  },
  { page: number; limit: number }
>("products/fetchProducts", async ({ page, limit }) => {
  const response = await getProducts(page, limit);

  return {
    products: response.products,
    totalItems: response.totalItems,
  };
});

export const createNewProduct = createAsyncThunk(
  "products/createProduct",
  async (productData: Omit<Product, "_id">) => {
    const response = await createProduct(productData);
    return response;
  }
);

export const updateExistingProduct = createAsyncThunk(
  "products/updateProduct",
  async ({
    id,
    productData,
  }: {
    id: string;
    productData: Omit<Product, "_id">;
  }) => {
    const response = await updateProduct(id, productData);
    return response;
  }
);

// Product slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateExistingProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export const { setCurrentPage } = productSlice.actions;

export default productSlice.reducer;
