import React, { useState, useEffect } from "react";
import { getOrders, updateOrderStatus } from "../services/orderApiService";
import { Order } from "../types/types";
import Dropdown from "./Dropdown";
import { Button, Table, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response.data);
      } catch (error) {
        setError("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    const previousOrders = [...orders];

    const updatedOrders = orders.map((order) =>
      order._id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);

    try {
      await updateOrderStatus(orderId, status);
    } catch (error) {
      console.error("Error updating status", error);
      setOrders(previousOrders);
      setError("Failed to update status");
    }
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
          {orders.length > 0 ? (
            orders.map((order, index) => (
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

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default OrderList;
