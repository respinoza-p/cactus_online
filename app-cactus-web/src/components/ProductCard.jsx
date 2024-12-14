import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ cactus }) => {
  const { dispatch } = useContext(CartContext);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: cactus });
    alert(`${cactus.name} añadido al carrito!`);
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src={cactus.image} className="card-img-top" alt={cactus.name} />
      <div className="card-body">
        <h5 className="card-title">{cactus.name}</h5>
        <p className="card-text">{cactus.description}</p>
        <p className="card-text">
          <strong>${cactus.price}</strong>
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