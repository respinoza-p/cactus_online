import React from "react";
import cactusData from "../data/cactusData";
import ProductCard from "../components/ProductCard";

const Products = () => (
  <div className="container mt-4">
    <h1 className="text-center">Catálogo de Cactus</h1>
    <div className="row">
      {cactusData.map((cactus) => (
        <div className="col-md-4 mb-4" key={cactus.id}>
          <ProductCard cactus={cactus} />
        </div>
      ))}
    </div>
  </div>
);

export default Products;