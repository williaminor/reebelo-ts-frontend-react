import React, { useState, useEffect } from "react";
import { createOrder } from "../services/orderApiService";
import { getProducts } from "../services/productApiService";
import { OrderItem, Product } from "../types/types";
import { Table, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";

const CreateOrder: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<OrderItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const handleConfirm = async () => {
    try {
      await createOrder({
        _id: "",
        products: selectedItems,
        status: "pending",
      });
      toast.success("Order created successfully!");
      navigate("/orders");
    } catch (error) {
      toast.error("Failed to order product.");
      setError("Failed to create order");
    }
  };

  const handleClose = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        setError("Failed to fetch products");
      }
    };

    fetchProducts();
  }, []);

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === productId ? { ...item, quantity } : item
        );
      } else {
        return [...prevItems, { productId, quantity }];
      }
    });
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setShowConfirmModal(true);
  };

  return (
    <div className="container mt-5">
      <h4 className="mb-4">Add New Order</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>
                <Form.Control
                  type="number"
                  min="1"
                  value={
                    selectedItems.find((item) => item.productId === product._id)
                      ?.quantity || 0
                  }
                  onChange={(e) =>
                    handleQuantityChange(product._id, parseInt(e.target.value))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary" onClick={handleCreateOrder}>
        Create Order
      </Button>
      <ConfirmModal
        show={showConfirmModal}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Are you sure?"
        message="Do you really want to create this order?"
      />
    </div>
  );
};

export default CreateOrder;
