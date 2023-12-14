import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../../Contexts/authContext";

export default function AuthGuard(data) {
  const { isAuthenticated } = useContext(AuthContext);
  const ifAuthenticated = data.authenticated;

  if (ifAuthenticated && !isAuthenticated) {
    return <Navigate to="/login" />;
  } else if (!ifAuthenticated && isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
