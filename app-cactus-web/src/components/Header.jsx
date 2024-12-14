import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Eliminar token
    alert("Sesión cerrada con éxito.");
    navigate("/login"); // Redirigir a Login
  };

  return (
    <header className="bg-success text-white p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="m-0">🌵 Cactus Online</h1>
        <nav>
          <Link to="/products" className="text-white me-4 text-decoration-none">
            Catálogo
          </Link>
          <Link to="/cart" className="text-white me-4 text-decoration-none">
            Carrito
          </Link>

          {isAuthenticated() ? (
            <>
              <Link
                to="/profile"
                className="text-white me-4 text-decoration-none"
              >
                Actualizar Registro
              </Link>
              <button
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white me-4 text-decoration-none"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-white text-decoration-none"
              >
                Crear Cuenta
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;