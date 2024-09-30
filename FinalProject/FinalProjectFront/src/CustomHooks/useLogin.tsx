import { useContext } from "react";
import { LoggedInContext } from "../ContextAPI/LoggedInContext";

const useLogin = () => {
  const loggedInContext = useContext(LoggedInContext);
  if (!loggedInContext) {
    throw new Error("userAuth must be within AuthProvider");
  }
  return loggedInContext;
};

export { useLogin };
