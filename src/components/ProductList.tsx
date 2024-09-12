import React, { useState, useEffect } from "react";
import { getProducts } from "../services/productApiService";
import { Product } from "../types/types";
import Pagination from "./CustomPagination";
import { Table, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomPagination from "./CustomPagination";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Product List</h4>
        <Button variant="success">
          <Nav.Link as={Link} to="/create-product">
            + Add Product
          </Nav.Link>
        </Button>
      </div>
      <Table striped bordered hover className="mt-3">
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
          {paginatedProducts.map((product, index) => (
            <tr key={product._id}>
              <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stockQuantity}</td>
              <td>
                <Button variant="info py-0">
                  <Nav.Link
                    as={Link}
                    to={`/update-product/${product._id}`}
                    className="text-white"
                  >
                    Edit
                  </Nav.Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between">
        <p>
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, products.length)} of{" "}
          {products.length}
        </p>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductList;
