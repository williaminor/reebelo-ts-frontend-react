import React from "react";
import "./Modal.css";
import { Link } from "react-router-dom";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>{title}</h2>
        <div>{children}</div>
        <button onClick={onClose} className="close-button float-right">
          <Link to={"/products"}>Close</Link>
        </button>
      </div>
    </div>
  );
};

export default Modal;
