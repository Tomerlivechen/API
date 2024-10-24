import React, { useEffect, useState } from "react";
import ResizableFrame from "../Constants/Objects/ResizableFrame";
import { UserTabList } from "../Components/UserTabList";
import { useSearch } from "../CustomHooks/useSearch";
import UserLane from "../Constants/Objects/UserLane";
import { PostFrame } from "../Constants/Objects/PostFrame";
import { useParams } from "react-router-dom";
import { IPostDisplay } from "../Models/Interaction";
import { Posts } from "../Services/post-service";
import PostView from "../Constants/Objects/PostView";
import { ProfileGroupsList } from "../Constants/Objects/ProfileGroupsList";
import { IAppUserDisplay } from "../Models/UserModels";
import { Chat } from "../Services/chat-service";
import { auth } from "../Services/auth-service";
import { useUser } from "../CustomHooks/useUser";
import { isEqual } from "lodash";
import { colors } from "../Constants/Patterns";

const Feed = () => {
  const { postId } = useParams();
  const searchContext = useSearch();
  const userContext = useUser();
  const [singularPost, setSingularPost] = useState<IPostDisplay | null>(null);
  const [tempFollowingUsers, setTempFollowingUsers] = useState<
    IAppUserDisplay[] | null
  >(null);
  const [tempChattingUsers, setTempChattingUsers] = useState<
    IAppUserDisplay[] | null
  >(null);
  const [followingUsers, setFollowingUsers] = useState<
    IAppUserDisplay[] | null
  >(null);
  const [chattingUsers, setChattingUsers] = useState<IAppUserDisplay[] | null>(
    null
  );
  useEffect(() => {
    const getSinglePost = async () => {
      if (postId) {
        const SinglePost = await Posts.getPostById(postId);
        setSingularPost(SinglePost.data);
      }
    };
    getSinglePost();
  }, [postId]);

  useEffect(() => {}, []);

  const intervalTime = 10000;
  useEffect(() => {
    const interval = setInterval(() => {
      getInteractingUsersLists();
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  const getInteractingUsersLists = async () => {
    if (userContext.userInfo.UserId) {
      const response = await Chat.GetNotFollowingChats();
      setTempChattingUsers(response.data);
      const fRespons = await auth.GetUsersFollowing(
        userContext.userInfo.UserId
      );
      setTempFollowingUsers(fRespons.data);
    }
  };

  useEffect(() => {
    if (!isEqual(tempFollowingUsers, followingUsers)) {
      setFollowingUsers(tempFollowingUsers);
    }
    if (!isEqual(tempChattingUsers, chattingUsers)) {
      setChattingUsers(tempChattingUsers);
    }
  }, [chattingUsers, followingUsers, tempChattingUsers, tempFollowingUsers]);

  return (
    <>
      <div className="flex flex-wrap justify-between">
        <div className="xl:w-1/12 hidden lg:block w-0/12 pr-2 pl-2"></div>
        <div className="lg:w-3/12 xl:w-2/12 hidden lg:block pr-2 pl-2">
          <UserLane userId={null} />
          <ResizableFrame
            whidth={"auto"}
            title={"Groups"}
            show={true}
            overflowX={false}
            tailwindProps="  h-auto"
          >
            <ProfileGroupsList />
          </ResizableFrame>
        </div>
        <div className="xl:w-1/12 hidden lg:block w-0/12 pr-2 pl-2"></div>
        <div className="  lg:w-4/12 pl-2 pr-2  md:w-1/2 sm:w-full">
          <div>
            {!postId && <PostFrame UserList={[]} />}
            {postId && singularPost && <PostView {...singularPost} />}
          </div>
        </div>
        <div className="xl:w-1/12 hidden lg:block pr-2 pl-2"></div>
        <div className=" lg:w-3/12 xl:w-2/12 hidden md:block md:w-1/2  w-0/12 pr-2 pl-2">
          <>
            <ResizableFrame
              whidth={"100%"}
              title={"People"}
              show={true}
              tailwindProps=" h-full"
            >
              <div className={`${colors.ActiveText} text-center`}>
                Following
              </div>

              {followingUsers && <UserTabList users={followingUsers} />}

              <div className={`${colors.ActiveText} text-center`}>
                Open Chats
              </div>

              {chattingUsers && <UserTabList users={chattingUsers} />}
            </ResizableFrame>
          </>
        </div>
        <div className="xl:w-1/12 hidden lg:block pr-2 pl-2"></div>
      </div>
    </>
  );
};

export default Feed;
