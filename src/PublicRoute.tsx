import { Navigate, Outlet } from "react-router-dom";
import { paths } from "./config/paths";
import { useSelector } from "react-redux";
import { selectUser } from "./redux-toolkit/userDetailSlice";

const PublicRoute = () => {
  const userDetails = useSelector(selectUser);
  const isUserExist = Object.keys(userDetails).length > 0;

  if (isUserExist) {
    return <Navigate to={paths.dashboard.path} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
