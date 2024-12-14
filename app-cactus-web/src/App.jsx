import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  useEffect(() => {
    document.title = "Cactus Online";
  }, []);

  return (
    <CartProvider>
      <PayPalScriptProvider options={{ "client-id": "ATbZwPJBNIuILwyhwycw35kHGdU3Zs6KhutLSaWOLNc6aai3bGe61ieG-kR7VD7tSJ1KxwOoijBu7uxV" }}>
        <Router>
          <Header />
          <main className="container py-4">
            <Routes>
              <Route path="/" element={<Products />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </PayPalScriptProvider>
    </CartProvider>
  );
}

export default App;