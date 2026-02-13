import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminGuard({ children }) {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
