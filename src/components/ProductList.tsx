import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../services/apiService";
import { Product } from "../types/types";
import "./ProductList.css";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h3>Product List</h3>
        <button>
          <Link to="/create-product">+ Create Product</Link>
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.stockQuantity}</td>
                <td>
                  <Link to={`/update-product/${product._id}`}>Edit</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
