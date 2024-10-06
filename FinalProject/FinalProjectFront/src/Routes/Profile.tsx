import { useContext, useEffect, useState } from "react";
import ProfileUserSection from "../Constants/Objects/ProfileUserSection";
import { auth } from "../Services/auth-service";
import { UserContext } from "../ContextAPI/UserContext";

import ElementFrame from "../Constants/Objects/ElementFrame";


function Profile() {
  const { userInfo } = useContext(UserContext);
  const [UserDisplay, setUserDisplay] = useState<string | null>(null);

  useEffect(() => {
    if (userInfo && userInfo.UserId) {
      auth.getUser(userInfo.UserId).then((response) => {
        setUserDisplay(response.data);
      });
    }
  }, [userInfo]);
  return (
    <>
      <ElementFrame height="300px" width="800px" padding="0">
        {UserDisplay && <ProfileUserSection UserDisplay={UserDisplay} />}
      </ElementFrame>
    </>
  );
}

export default Profile;
