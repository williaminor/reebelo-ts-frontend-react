import React from "react";
import { createProduct } from "../services/productApiService";
import ProductForm from "./ProductForm";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";

const CreateProduct: React.FC = () => {
  const handleCreateProduct = async (productData: {
    name: string;
    price: number;
    stockQuantity: number;
  }) => {
    try {
      await createProduct({ ...productData });
      toast.success("Product created successfully!");
    } catch (error) {
      toast.error("Failed to create product.");
    }
  };

  return (
    <Container className="mt-4">
      <h4>Add New Product</h4>
      <ProductForm onSubmit={handleCreateProduct} isEditing={false} />
    </Container>
  );
};

export default CreateProduct;
