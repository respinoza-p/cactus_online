import React from "react";

const Footer = () => (
  <footer className="footer bg-success text-white text-center py-3">
    <div className="container">
      <p className="m-0">
        © {new Date().getFullYear()} Cactus Online. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;