import { Navigate, Outlet, useLocation } from "react-router-dom";
import { paths } from "./config/paths";
import { useQuery } from "@tanstack/react-query";
import api from "./lib/api";
import LoadingScreen from "./components/ui/loading";
import { useEffect } from "react";
import { useLogout } from "./hooks/useLogout";

const ProtectedRoute = () => {
  const location = useLocation();
  const logoutMutation = useLogout();
  const getUser = async () => {
    const response = await api.get("/auth/me");
    if (response?.status) {
      return response?.data;
    }
    throw new Error("Unauthenticated");
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: getUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      logoutMutation.mutate();
    }
  }, [isError, data]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    const currentPath = location.pathname + location.search;
    const loginPathWithRedirect = paths.auth.login.getHref(currentPath);
    return <Navigate to={loginPathWithRedirect} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
