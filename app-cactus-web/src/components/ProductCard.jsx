import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ cactus }) => {
  const { dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: cactus, // Enviar datos del producto
    });
    alert(`${cactus.nombre} añadido al carrito!`);
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={cactus.imagen} className="card-img-top" alt={cactus.nombre} />
      <div className="card-body">
        <h5 className="card-title">{cactus.nombre}</h5>
        <p className="card-text">{cactus.descripcion}</p>
        <p className="card-text">
          <strong>${cactus.precio}</strong>
        </p>
        <button className="btn btn-success" onClick={handleAddToCart}>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  cactus: PropTypes.object.isRequired,
};

export default ProductCard;