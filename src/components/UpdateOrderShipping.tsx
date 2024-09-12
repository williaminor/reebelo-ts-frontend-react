import React, { useState, useEffect } from "react";
import { updateOrderShipping, getOrderById } from "../services/orderApiService";
import { TrackingInfo, Order } from "../types/types";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";

const UpdateOrderShipping: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo>({
    company: "",
    trackingNumber: "",
  });
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  const handleConfirm = async () => {
    try {
      await updateOrderShipping(id!, trackingInfo);
      toast.success("Order updated successfully!");
      navigate("/orders");
    } catch (error) {
      toast.error("Failed to update shipping info!");
      setError("Failed to update shipping info");
    }
  };

  const handleClose = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderById(id!);
        setOrder(response.data);
        if (response.data.tracking) {
          setTrackingInfo(response.data.tracking);
        }
      } catch (error) {
        setError("Failed to fetch order");
      }
    };

    fetchOrder();
  }, [id]);

  const handleUpdateShipping = (e: React.FormEvent) => {
    e.preventDefault();

    if (!trackingInfo.company.trim()) {
      setError("Tracking company is required");
      return;
    }

    if (!trackingInfo.trackingNumber.trim()) {
      setError("Tracking number name is required");
      return;
    }

    setError("");
    setShowConfirmModal(true);
  };

  return (
    <div className="container mt-4">
      <h4>Update Shipping Information</h4>
      {error && <Alert variant="danger">{error}</Alert>}
      {order && (
        <Form>
          <Form.Group controlId="company" className="mt-2">
            <Form.Label>Tracking Company</Form.Label>
            <Form.Control
              type="text"
              value={trackingInfo.company}
              onChange={(e) =>
                setTrackingInfo({ ...trackingInfo, company: e.target.value })
              }
              placeholder="Enter tracking company"
            />
          </Form.Group>
          <Form.Group controlId="trackingNumber" className="mt-2">
            <Form.Label>Tracking Number</Form.Label>
            <Form.Control
              type="text"
              value={trackingInfo.trackingNumber}
              onChange={(e) =>
                setTrackingInfo({
                  ...trackingInfo,
                  trackingNumber: e.target.value,
                })
              }
              placeholder="Enter tracking number"
            />
          </Form.Group>
          <Button
            variant="primary"
            onClick={handleUpdateShipping}
            className="mt-3"
          >
            Update Shipping
          </Button>
        </Form>
      )}

      <ConfirmModal
        show={showConfirmModal}
        onClose={handleClose}
        onConfirm={handleConfirm}
        title="Are you sure?"
        message="Do you really want to update this order?"
      />
    </div>
  );
};

export default UpdateOrderShipping;
