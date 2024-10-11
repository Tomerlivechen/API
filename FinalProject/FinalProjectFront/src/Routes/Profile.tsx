import {  useEffect, useState } from "react";
import ProfileUserSection from "../Constants/Objects/ProfileUserSection";
import { auth } from "../Services/auth-service";

import { useParams } from "react-router-dom";
import { useUser } from "../CustomHooks/useUser";


const Profile=() =>{
  const { userId } = useParams();
  const [userIdState, setUserIdState] = useState<string | null>(userId);

  
  return (
    <>
       <ProfileUserSection userId={userIdState} />
    </>
  );
}

export default Profile;
