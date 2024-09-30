import { Navigate } from "react-router-dom";
import { useLogin } from "../../CustomHooks/useLogin";
import { FCP } from "./@types";

const NoAuthRoute: FCP = ({ children }) => {
  const { isLoggedin } = useLogin();

  if (isLoggedin) {
    return <Navigate to="/" />;
  }
  return children;
};

export default NoAuthRoute;
