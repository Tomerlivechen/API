import { useEffect, useState } from "react";
import ProfileUserSection from "../Constants/Objects/ProfileUserSection";
import { auth } from "../Services/auth-service";

import { useParams } from "react-router-dom";
import { useUser } from "../CustomHooks/useUser";
import { PostFrame } from "../Constants/Objects/PostFrame";
import ResizableFrame from "../Constants/Objects/ResizableFrame";
import { UserTabList } from "../Components/UserTabList";
import { IAppUserDisplay } from "../Models/UserModels";
import { useChat } from "../CustomHooks/useChat";
import { ProfileGroupsList } from "../Constants/Objects/ProfileGroupsList";

const Profile = () => {
  const userContext = useUser();
  const { userId } = useParams();
  const [userIdState, setUserIdState] = useState<string | null>(null);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [usersList, setUsersList] = useState<IAppUserDisplay[] | null>(null);

  const GetFollowing = async (profileId: string) => {
    const response = await auth.GetUsersFollowing(profileId);
    setUsersList(response.data);
  };

  useEffect(() => {
    if (userId) {
      GetFollowing(userId);
      setUserIdState(userId);
    } else if (userContext.userInfo.UserId) {
      GetFollowing(userContext.userInfo.UserId);
    }
  }, [userId]);

  useEffect(() => {
    if (usersList) {
      setLoadingUsers(false);
    }
  }, [usersList]);

  return (
    <>
      <div className="flex flex-wrap justify-center">
        <div className="w-full lg:w-10/12 pr-2 pl-2 mx-auto">
          <ProfileUserSection userId={userIdState} />
        </div>
      </div>

      <div className="flex flex-wrap justify-between">
        <div className="hidden lg:block lg:w-1/12 pl-2 pr-2"></div>
        <div className="hidden lg:block lg:w-2/12 pl-2 pr-2  ">
          <>
            <ResizableFrame
              whidth={"auto"}
              title={"Groups"}
              show={true}
              overflowX={false}
              tailwindProps="  h-auto"
            >
              <ProfileGroupsList />
            </ResizableFrame>
          </>
        </div>
        <div className="hidden lg:block lg:w-2/12 pl-2 pr-2 h-1/2">
          {!loadingUsers && usersList && (
            <>
              <ResizableFrame
                whidth={"100%"}
                title={"Following"}
                show={true}
                tailwindProps=" h-full"
              >
                <UserTabList users={usersList} />
              </ResizableFrame>
            </>
          )}
        </div>
        <div className="w-full lg:w-7/12 pl-2 pr-2">
          <PostFrame UserList={[]} />
        </div>
      </div>
    </>
  );
};

export default Profile;
