import { useEffect, useState } from "react";
import ProfileUserSection from "../Constants/Objects/ProfileUserSection";
import { auth } from "../Services/auth-service";

import { useParams } from "react-router-dom";
import { useUser } from "../CustomHooks/useUser";
import { PostFrame } from "../Constants/Objects/PostFrame";

const Profile = () => {
  const { userId } = useParams();
  const [userIdState, setUserIdState] = useState<string | null>(userId);

  return (
    <>
      <ProfileUserSection userId={userIdState} />
      <div className="flex flex-wrap justify-between">
        <div className="lg:w-1/3  lg:block hidden pr-2 pl-2"></div>
        <div className="lg:w-2/3 md:w-2/3 sm:w-full pl-2 pr-2">
          <PostFrame />
        </div>
      </div>
    </>
  );
};

export default Profile;
