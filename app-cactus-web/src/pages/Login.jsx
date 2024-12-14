// src/pages/Login.jsx
import React, { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    console.log("Datos de inicio de sesión:", formData);
    alert("Inicio de sesión exitoso!");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-50">
      <div className="card p-4" style={{ width: "24rem" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
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

          <button type="submit" className="btn btn-success w-100">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;