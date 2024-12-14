import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { PayPalButtons } from "@paypal/react-paypal-js";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;
  const [success, setSuccess] = useState(false);

  // Calcular el total
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Eliminar un producto
  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  // Manejar transacción exitosa
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
                key={item.id}
              >
                <span>
                  {item.name} - ${item.price} x {item.quantity}
                </span>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(item.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          <h4 className="mb-3">Total: ${totalAmount.toFixed(2)}</h4>

          {success ? (
            <div className="alert alert-success">
              ¡Compra realizada con éxito!
            </div>
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