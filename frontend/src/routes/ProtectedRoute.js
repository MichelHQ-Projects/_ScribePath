import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;// ✅ Replace "Loading..." with spinner

  return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
