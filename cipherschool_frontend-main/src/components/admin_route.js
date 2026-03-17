import { Navigate, useLocation } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../utils/auth";

function AdminRoute({ children }) {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/home" state={{ from: location }} replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default AdminRoute;
