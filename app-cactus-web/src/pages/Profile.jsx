// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const API_PROFILE_URL = import.meta.env.VITE_API_REGISTER_URL;

const Profile = () => {
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    email: "",
    direccion: "",
    pais: "Chile",
    region: "",
    comuna: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  // Obtener datos del usuario autenticado
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("authToken");

        const response = await axios.get(`${API_PROFILE_URL}/me`, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });

        // Asegurarse de configurar correctamente el ID
        setFormData({
          id: response.data._id, // Establecer el ID del usuario
          nombre: response.data.nombre,
          email: response.data.email,
          direccion: response.data.direccion,
          pais: response.data.pais,
          region: response.data.region,
          comuna: response.data.comuna,
        });
      } catch (err) {
        console.error("Error al cargar datos:", err);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [navigate]);

  // Manejar cambios en los campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const token = localStorage.getItem("authToken");

      await axios.put(
        `${API_PROFILE_URL}/${formData.id}`, // Usar el ID correcto
        {
          nombre: formData.nombre,
          direccion: formData.direccion,
          pais: formData.pais,
          region: formData.region,
          comuna: formData.comuna,
        },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
      alert("Datos actualizados con éxito.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Error al actualizar los datos."
      );
      console.error("Error:", err.response?.data || err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre Completo</label>
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Ingresa tu nombre"
            required
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            className="form-control"
            required
            value={formData.email}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            name="direccion"
            className="form-control"
            placeholder="Ingresa tu dirección"
            required
            value={formData.direccion}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">País</label>
          <select
            name="pais"
            className="form-control"
            required
            value={formData.pais}
            onChange={handleInputChange}
            disabled
          >
            <option value="Chile">Chile</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Región</label>
          <input
            type="text"
            name="region"
            className="form-control"
            placeholder="Ingresa tu región"
            required
            value={formData.region}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Comuna</label>
          <input
            type="text"
            name="comuna"
            className="form-control"
            placeholder="Ingresa tu comuna"
            required
            value={formData.comuna}
            onChange={handleInputChange}
          />
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="alert alert-success" role="alert">
            ¡Datos actualizados con éxito!
          </div>
        )}

        <button type="submit" className="btn btn-success">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default Profile;