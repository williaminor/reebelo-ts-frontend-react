import React, { useEffect } from "react";
import { Table, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchProducts, setCurrentPage } from "../store/productSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import CustomPagination from "./CustomPagination";

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, currentPage, itemsPerPage, totalItems } = useAppSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

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
          {items.map((product, index) => (
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
      <CustomPagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
