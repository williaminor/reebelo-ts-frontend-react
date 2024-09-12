import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../services/productApiService";
import ProductForm from "./ProductForm";
import { Product } from "../types/types";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";

const UpdateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id!);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", error);
        setError("Failed to fetch product.");
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (productData: {
    name: string;
    price: number;
    stockQuantity: number;
  }) => {
    try {
      await updateProduct(id!, productData);
      toast.success("Product updated successfully!");
    } catch (error) {
      toast.error("Failed to update product.");
      setError("Failed to update product.");
    }
  };

  return (
    <Container className="mt-4">
      <h4>Edit Product</h4>
      {error && <p className="text-danger">{error}</p>}
      {product ? (
        <ProductForm
          product={product}
          onSubmit={handleUpdateProduct}
          isEditing={true}
        />
      ) : (
        <p>Loading product...</p>
      )}
    </Container>
  );
};

export default UpdateProduct;
