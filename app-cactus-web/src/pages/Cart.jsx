// src/pages/Cart.jsx
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { PayPalButtons } from "@paypal/react-paypal-js";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  // Calcular el total
  const totalAmount = cart.reduce(
    (total, item) => total + item.precio * item.quantity,
    0
  );

  // Manejar eliminación de un producto
  const handleRemove = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { _id: id },
    });
  };

  // Manejar cambio de cantidad
  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return; // Evitar valores negativos

    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { _id: id, quantity: parseInt(quantity) },
    });
  };

  // Manejar aprobación de la compra
  const handleApprove = (details) => {
    setSuccess(true);
    console.log("Compra exitosa:", details);
  };

  return (
    <div className="container mt-4">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ul className="list-group mb-4">
            {cart.map((item) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={item._id}
              >
                <span>
                  {item.nombre} - ${item.precio} x{" "}
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    className="form-control d-inline w-auto"
                    onChange={(e) =>
                      handleQuantityChange(item._id, e.target.value)
                    }
                  />
                </span>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(item._id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <h4 className="mb-3">Total: ${totalAmount.toFixed(2)}</h4>

          {success ? (
            <div className="alert alert-success">¡Compra realizada con éxito!</div>
          ) : (
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalAmount.toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                handleApprove(details);
              }}
              onError={(err) => {
                console.error("Error en el pago:", err);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Cart;