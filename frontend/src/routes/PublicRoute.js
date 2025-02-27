import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;// ✅ Replace "Loading..." with spinner

  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
