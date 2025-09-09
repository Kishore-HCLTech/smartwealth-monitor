import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  requiredRole?: string;
}

const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const location = useLocation();
  const userString = localStorage.getItem("user");

  if (!userString) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  try {
    const user = JSON.parse(userString);

    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/home" replace />;
    }

    return <Outlet />;
  } catch (error) {
    console.error("Error parsing user:", error);
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
