import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProducts, updateProduct } from "../services/apiService";
import ProductForm from "./ProductForm";
import { Product } from "../types/types";

const UpdateProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProducts();
        const selectedProduct = response.data.find(
          (p: Product) => p._id === id
        );
        if (selectedProduct) {
          setProduct(selectedProduct);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
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
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      {product ? (
        <ProductForm
          product={product}
          onSubmit={handleUpdateProduct}
          isEditing={true}
        />
      ) : (
        <p>Loading product...</p>
      )}
    </div>
  );
};

export default UpdateProduct;
