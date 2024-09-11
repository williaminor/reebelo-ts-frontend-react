import React, { useState, useEffect } from "react";
import { Product } from "../types/types";
import "./ProductForm.css";
import Modal from "./Modal";

interface ProductFormProps {
  product?: Product;
  onSubmit: (productData: Omit<Product, "_id">) => void;
  isEditing?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  isEditing,
}) => {
  const [name, setName] = useState<string>(product?.name || "");
  const [price, setPrice] = useState<number>(product?.price || 0);
  const [stockQuantity, setStockQuantity] = useState<number>(
    product?.stockQuantity || 0
  );
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Product name is required");
      return;
    }
    if (price <= 0) {
      setError("Price must be a positive number");
      return;
    }
    if (stockQuantity < 0) {
      setError("Stock quantity must be a non-negative number");
      return;
    }

    setError("");
    onSubmit({ name, price, stockQuantity });
    setShowModal(true);
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStockQuantity(product.stockQuantity);
    }
  }, [product]);

  return (
    <div className="product-form">
      <h2>{isEditing ? "Edit Product" : "Create New Product"}</h2>
      {error && <p className="error text-red">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stockQuantity">Stock Quantity:</label>
          <input
            type="number"
            id="stockQuantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
          />
        </div>
        <button type="submit">
          {isEditing ? "Update Product" : "Create Product"}
        </button>
      </form>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Success"
      >
        <p>
          {isEditing
            ? "Product updated successfully!"
            : "Product created successfully!"}
        </p>
      </Modal>
    </div>
  );
};

export default ProductForm;
