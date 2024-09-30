import React, { useContext, useEffect, useState } from "react";
import ProfileUserSection from "../Constants/Objects/ProfileUserSection";
import { auth } from "../Services/auth-service";
import { UserContext } from "../ContextAPI/UserContext";
import { useLogin } from "../CustomHooks/useLogin";
import ElementFrame from "../Constants/Objects/ElementFrame";

function Profile() {
  const { userInfo } = useContext(UserContext);
  const [UserDisplay, setUserDisplay] = useState<string | null>(null);
  const loggin = useLogin();
  useEffect(() => {
    if (userInfo && userInfo.UserId) {
      auth
        .getUser(loggin.token ?? "", userInfo.UserId)
        .then((response: string) => {
          setUserDisplay(response);
        });
    }
  }, [userInfo]);
  return (
    <>
      <ElementFrame height="300" width="800">
        {UserDisplay && <ProfileUserSection UserDisplay={UserDisplay} />}
      </ElementFrame>
    </>
  );
}

export default Profile;
