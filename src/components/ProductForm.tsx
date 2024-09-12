import React, { useState, useEffect } from "react";
import { Product } from "../types/types";
import ConfirmModal from "./ConfirmModal";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    onSubmit({ name, price, stockQuantity });
    navigate("/products");
    setShowConfirmModal(false);
  };

  const handleClose = () => {
    setShowConfirmModal(false);
  };

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
    setShowConfirmModal(true);
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setStockQuantity(product.stockQuantity);
    }
  }, [product]);

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mt-2">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="price" className="mt-2">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </Form.Group>

        <Form.Group controlId="stockQuantity" className="mt-2">
          <Form.Label>Stock Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter stock quantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(Number(e.target.value))}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          {isEditing ? "Update Product" : "Create Product"}
        </Button>
      </Form>

      {isEditing ? (
        <ConfirmModal
          show={showConfirmModal}
          onClose={handleClose}
          onConfirm={handleConfirm}
          title="Are you sure?"
          message="Do you really want to update this product?"
        />
      ) : (
        <ConfirmModal
          show={showConfirmModal}
          onClose={handleClose}
          onConfirm={handleConfirm}
          title="Are you sure?"
          message="Do you really want to create this product?"
        />
      )}
    </Container>
  );
};

export default ProductForm;
