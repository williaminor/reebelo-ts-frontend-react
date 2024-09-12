import React, { useEffect } from "react";
import Dropdown from "./Dropdown";
import { Button, Table, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomPagination from "./CustomPagination";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  fetchOrders,
  setCurrentPage,
  updateOrderStatusThunk,
} from "../store/orderSlice";

const OrderList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, currentPage, itemsPerPage, totalItems } = useAppSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchOrders({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const handleStatusChange = (orderId: string, status: string) => {
    dispatch(updateOrderStatusThunk({ orderId, status }));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Order List</h4>
        <Button variant="primary">
          <Nav.Link as={Link} to="/create-order" className="text-white">
            + Add Order
          </Nav.Link>
        </Button>
      </div>

      <Table striped bordered hover>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Order ID</th>
            <th>Status</th>
            <th>Edit Shipping</th>
          </tr>
        </thead>
        <tbody>
          {items ? (
            items.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order._id}</td>
                <td>
                  <Dropdown
                    options={["processing", "canceled", "delivered"]}
                    onSelect={(status) => handleStatusChange(order._id, status)}
                    value={order.status}
                    placeholder="Change Status"
                  />
                </td>
                <td>
                  <Button variant="outline-primary py-0">
                    <Nav.Link
                      as={Link}
                      to={`/update-order-shipping/${order._id}`}
                    >
                      Edit
                    </Nav.Link>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No orders available</td>
            </tr>
          )}
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

export default OrderList;
