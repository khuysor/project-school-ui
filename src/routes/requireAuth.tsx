import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { routes } from "./routes";
import { deleteToken, getAuth } from "../util/auth";
import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}
const RequireAuth = ({ children }: Prop) => {
  const location = useLocation();

  const auth = getAuth();
  if (deleteToken()) {
    return <Navigate to={routes.login} state={{ from: location }} replace />;
  }
  try {
    if (!auth || !auth.role || !auth.user || !auth.token) {
      return <Navigate to={routes.login} state={{ from: location }} replace />;
    }
    return children;
  } catch {
    return <Navigate to={routes.login} state={{ from: location }} replace />;
  }
};

export default RequireAuth;
