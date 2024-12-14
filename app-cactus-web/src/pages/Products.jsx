import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const API_URL = import.meta.env.VITE_API_URL;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Obtener productos desde la API
  const fetchProducts = async () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data);
    } catch (err) {
      setError("Error al cargar los productos. Intenta de nuevo.");
      console.error(err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center">Catálogo de Cactus</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product._id}>
            <ProductCard cactus={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;