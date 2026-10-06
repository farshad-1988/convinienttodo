import { useEffect, type ReactNode } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuthStorage } from "../hooks/useAuthStorage";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const authUser = useAuthStorage();
  const location = useLocation();

  if (!authUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export const RedirectIfAuthenticated = () => {
  const authUser = useAuthStorage();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate("/dashboard", { replace: true });
    }
  }, [authUser, navigate]);

  return null;
};
