import React, { useState } from "react";

const regiones = {
  "Región Metropolitana": ["Santiago", "Providencia", "Las Condes"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué"],
  "Biobío": ["Concepción", "Talcahuano", "Chiguayante"],
};

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
    region: "",
    comuna: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    console.log("Datos del formulario:", formData);
    alert("Registro exitoso!");
  };

  return (
    <div className="container mt-4" style={{ width: "45rem" }}>
      <h2>Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        {/* Nombre */}
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

        {/* Dirección */}
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

        {/* País */}
        <div className="mb-3">
          <label className="form-label">País</label>
          <select className="form-control" disabled>
            <option>Chile</option>
          </select>
        </div>

        {/* Región */}
        <div className="mb-3">
          <label className="form-label">Región</label>
          <select
            name="region"
            className="form-control"
            required
            value={formData.region}
            onChange={handleInputChange}
          >
            <option value="">Selecciona una región</option>
            {Object.keys(regiones).map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Comuna */}
        <div className="mb-3">
          <label className="form-label">Comuna</label>
          <select
            name="comuna"
            className="form-control"
            required
            value={formData.comuna}
            onChange={handleInputChange}
            disabled={!formData.region}
          >
            <option value="">Selecciona una comuna</option>
            {formData.region &&
              regiones[formData.region].map((comuna) => (
                <option key={comuna} value={comuna}>
                  {comuna}
                </option>
              ))}
          </select>
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

        {/* Reingresar Contraseña */}
        <div className="mb-3">
          <label className="form-label"> (*) Reingresar Contraseña</label>
          <input
            type="password"
            name="confirmPassword"
            className="form-control"
            placeholder="Reingresa tu contraseña"
            required
            value={formData.confirmPassword}
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
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;