import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export interface IUserValues {
  userInfo: {
    UserId: string | null;
    UserName: string | null;
    PermissionLevel: string | null;
    IsAdmin: string | null;
  };
}

export const initialValues: IUserValues = {
  userInfo: {
    UserId: null,
    UserName: null,
    PermissionLevel: null,
    IsAdmin: null,
  },
};

export interface IDecodedToken {
  UserId: string;
  UserName: string;
  PermissionLevel: string;
  IsAdmin: string;
}
const UserContext = createContext(initialValues);

function UserProvider({ children }) {
  const [authState, setAuthState] = useState<IUserValues>(initialValues);
  useEffect(() => {
    const JWTtoken = localStorage.getItem("token");
    if (JWTtoken) {
      const decodedToken = jwtDecode<IDecodedToken>(JWTtoken);
      const newAuthState: IUserValues = {
        userInfo: {
          UserId: decodedToken.UserId || null,
          UserName: decodedToken.UserName || null,
          PermissionLevel: decodedToken.PermissionLevel || null,
          IsAdmin: decodedToken.IsAdmin || null,
        },
      };
      setAuthState(newAuthState);
    }
  }, []);

  return (
    <UserContext.Provider value={authState}>{children}</UserContext.Provider>
  );
}

export { UserContext, UserProvider };
