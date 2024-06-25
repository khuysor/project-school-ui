import { Navigate } from "react-router-dom";
import { getAuth } from "../util/auth";
import { routes } from "./routes";

function Redirect() {
  const login = getAuth();
  return (
    <Navigate to={login ? routes.dashboard : routes.login} replace={true} />
  );
}

export default Redirect;
