import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProduct = React.lazy(() => import("./components/CreateProduct"));
const UpdateProduct = React.lazy(() => import("./components/UpdateProduct"));
const ProductList = React.lazy(() => import("./components/ProductList"));
const CreateOrder = React.lazy(() => import("./components/CreateOrder"));
const OrderList = React.lazy(() => import("./components/OrderList"));
const UpdateOrderShipping = React.lazy(
  () => import("./components/UpdateOrderShipping")
);

const App: React.FC = () => {
  return (
    <Router>
      <AppNavbar />
      <Container>
        <ToastContainer autoClose={2000} />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route
              path="/update-order-shipping/:id"
              element={<UpdateOrderShipping />}
            />
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </Suspense>
      </Container>
    </Router>
  );
};

export default App;
