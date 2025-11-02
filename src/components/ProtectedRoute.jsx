import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  // If not logged in, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but not authorized for this role
  if (allowedRoles && !allowedRoles.includes(user.role)){  
    return <Navigate to="/" replace />;
  }
  
  // Otherwise, show the route content
  return <Outlet />;
};

export default ProtectedRoute;
