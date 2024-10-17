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
      <div className="flex flex-wrap justify-center">
        <div className="hidden lg:block lg:w-3/12 pr-2 pl-2"></div>
        <div className="w-full lg:w-10/12 pr-2 pl-2 mx-auto">
          <ProfileUserSection userId={userIdState} />
        </div>
      </div>

      <div className="flex flex-wrap justify-between">
        <div className="hidden lg:block lg:w-5/12 pl-2 pr-2"></div>
        <div className="w-full lg:w-7/12 pl-2 pr-2">
          <PostFrame />
        </div>
      </div>
    </>
  );
};

export default Profile;
