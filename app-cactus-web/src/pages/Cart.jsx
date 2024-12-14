import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  return (
    <div className="container mt-4">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul className="list-group">
          {cart.map((item) => (
            <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
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
      )}
    </div>
  );
};

export default Cart;