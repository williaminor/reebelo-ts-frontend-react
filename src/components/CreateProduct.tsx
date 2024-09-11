import React from "react";
import { createProduct } from "../services/apiService";
import ProductForm from "./ProductForm";

const CreateProduct: React.FC = () => {
  const handleCreateProduct = async (productData: {
    name: string;
    price: number;
    stockQuantity: number;
  }) => {
    try {
      await createProduct({ ...productData });
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div>
      <ProductForm onSubmit={handleCreateProduct} isEditing={false} />
    </div>
  );
};

export default CreateProduct;
