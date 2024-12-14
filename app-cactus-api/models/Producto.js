// src/models/Producto.js
const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    // Nombre del producto
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [100, "El nombre no puede exceder los 100 caracteres"],
    },

    // Descripción del producto
    descripcion: {
      type: String,
      required: [true, "La descripción del producto es obligatoria"],
      minlength: [3, "La descripción debe tener al menos 3 caracteres"],
      maxlength: [200, "La descripción no puede exceder los 200 caracteres"],
    },

    // Precio del producto
    precio: {
      type: Number,
      required: [true, "El precio es obligatorio"],
      min: [1, "El precio debe ser al menos 1"],
      max: [500000, "El precio no puede exceder los 500000"],
    },

    // Fecha de registro
    fechaRegistro: {
      type: Date,
      default: Date.now,
    },

    // Ruta de la imagen
    imagen: {
      type: String,
      required: [true, "La ruta de la imagen es obligatoria"],
      validate: {
        validator: function (v) {
          return /\.(jpg|jpeg|png|gif)$/i.test(v);
        },
        message: "La ruta de la imagen debe tener una extensión válida (.jpg, .jpeg, .png, .gif)",
      },
    },
  },
  {
    // Campos automáticos createdAt y updatedAt
    timestamps: true,
  }
);

const Producto = mongoose.model("Producto", productoSchema);
module.exports = Producto;