// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const API_LOGIN_URL = import.meta.env.VITE_API_LOGIN_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores anteriores
  
    try {
      const response = await axios.post(API_LOGIN_URL, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Guardar token en LocalStorage
      localStorage.setItem("authToken", response.data.token);
  
      alert("Inicio de sesión exitoso!");
      navigate("/products"); // Redireccionar después del login
    } catch (err) {
      setError("Error en el inicio de sesión. Verifica tus credenciales.");
      console.error("Error:", err.response?.data || err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          {/* Correo Electrónico */}
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Ingresa tu correo"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Contraseña */}
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Ingresa tu contraseña"
              required
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          {/* Mensaje de Error */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-success">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;