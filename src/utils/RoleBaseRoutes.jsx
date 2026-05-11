import { useAuth } from "../context/ΑuthContext";
import { Navigate } from "react-router-dom";

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || !requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return user ? children : <Navigate to="/login" />;
};
export default RoleBaseRoutes;
