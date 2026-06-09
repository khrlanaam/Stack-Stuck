import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return null;
  }

  // Belum login
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // Bukan admin
  if (user.role !== "admin") {
    return (
      <Navigate
        to="/home"
        replace
      />
    );
  }

  return children;
}

export default AdminRoute;