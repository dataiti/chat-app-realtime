import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuthenticated = true;

  return !isAuthenticated ? <Navigate to="/login" /> : <Outlet />;
};

export default PublicRoute;
