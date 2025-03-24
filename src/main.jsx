import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // ✅ Import BrowserRouter
import { CartProvider } from "./context/CartContext"; // ✅ Import CartProvider
import App from "./App"; // ✅ Use App directly
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>  {/* ✅ Wrap App inside BrowserRouter */}
      <CartProvider>  {/* ✅ Wrap inside CartProvider */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
