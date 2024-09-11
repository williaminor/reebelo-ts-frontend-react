import React, { Suspense } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";

const CreateProduct = React.lazy(() => import("./components/CreateProduct"));
const UpdateProduct = React.lazy(() => import("./components/UpdateProduct"));
const ProductList = React.lazy(() => import("./components/ProductList"));

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Navbar />

        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
            <Route path="*" element={<Navigate to="/products" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
