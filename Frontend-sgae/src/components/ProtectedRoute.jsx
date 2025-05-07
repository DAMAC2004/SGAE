import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const tipo_user = localStorage.getItem("tipo_user");

  if (!tipo_user) {
    // Redirige al login con un mensaje
    return <Navigate to="/Login/AlumnosLog" state={{ message: "Debes iniciar sesión primero" }} />;
  }

  if (role && tipo_user !== role) {
    return <Navigate to="/Login/AlumnosLog" state={{ message: "No tienes permiso para acceder a esta ruta" }} />;
  }

  return children;
}
