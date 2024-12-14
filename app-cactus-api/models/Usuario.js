// src/models/Usuario.js
const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    // Nombre del usuario
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [50, "El nombre no puede exceder los 50 caracteres"],
    },

    // Email
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      match: [/.+\@.+\..+/, "El email debe tener un formato válido"],
    },

    // Contraseña
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
      minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
    },

    // Dirección
    direccion: {
      type: String,
      required: [true, "La dirección es obligatoria"],
      minlength: [5, "La dirección debe tener al menos 5 caracteres"],
      maxlength: [100, "La dirección no puede exceder los 100 caracteres"],
    },

    // País
    pais: {
      type: String,
      required: [true, "El país es obligatorio"],
      default: "Chile",
    },

    // Región
    region: {
      type: String,
      required: [true, "La región es obligatoria"],
      enum: [
        "Región Metropolitana",
        "Valparaíso",
        "Biobío",
        "Araucanía",
        "Atacama",
      ],
    },

    // Comuna
    comuna: {
      type: String,
      required: [true, "La comuna es obligatoria"],
      minlength: [3, "La comuna debe tener al menos 3 caracteres"],
      maxlength: [50, "La comuna no puede exceder los 50 caracteres"],
    },

    // Fecha de registro
    fechaRegistro: {
      type: Date,
      default: Date.now,
    },
  },
  {
    // Campos automáticos createdAt y updatedAt
    timestamps: true,
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;