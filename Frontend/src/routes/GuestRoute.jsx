import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function GuestRoute({ children }) {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return children;
  }

  // Jika admin
  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // Jika user biasa
  return <Navigate to="/home" replace />;
}

export default GuestRoute;