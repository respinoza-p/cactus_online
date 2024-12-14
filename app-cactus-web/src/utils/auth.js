// Verifica si el usuario está autenticado
export const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    return !!token; // Devuelve true si existe el token
  };