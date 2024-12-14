// src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="bg-success text-white p-3">
    <div className="container d-flex justify-content-between align-items-center">
      <h1 className="m-0">🌵 Cactus Online</h1>
      <nav>
        <Link to="/products" className="text-white me-4 text-decoration-none">
          Catálogo
        </Link>
        <Link to="/login" className="text-white me-4 text-decoration-none">
          Login
        </Link>
        <Link to="/register" className="text-white me-4 text-decoration-none">
          Crear Cuenta
        </Link>
        <Link to="/cart" className="text-white text-decoration-none">
          Carrito
        </Link>
      </nav>
    </div>
  </header>
);

export default Header;