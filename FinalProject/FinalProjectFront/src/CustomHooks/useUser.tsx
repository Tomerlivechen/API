import { useContext } from "react";
import { UserContext } from "../ContextAPI/UserContext";

const useUser = () => {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("userAuth must be within AuthProvider");
  }
  return userContext;
};

export { useUser };
