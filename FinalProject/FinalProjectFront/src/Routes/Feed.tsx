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

const Feed = () => {
  const { postId } = useParams();
  const searchContext = useSearch();
  const [singularPost, setSingularPost] = useState<IPostDisplay | null>(null);

  useEffect(() => {
    const getSinglePost = async () => {
      if (postId) {
        const SinglePost = await Posts.getPostById(postId);
        setSingularPost(SinglePost.data);
      }
    };
    getSinglePost();
  }, [postId]);

  useEffect(() => {
    if (searchContext.userList.length > 0) {
      setLoadingUsers(false);
    }
  }, [searchContext.userList]);

  const [loadingUsers, setLoadingUsers] = useState(true);

  return (
    <>
      <div className="flex flex-wrap justify-between">
        <div className="xl:w-1/12 hidden lg:block w-0/12 pr-2 pl-2"></div>
        <div className="lg:w-3/12 xl:w-2/12 hidden lg:block pr-2 pl-2">
          <UserLane />
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
          {!loadingUsers && (
            <>
              <ResizableFrame
                whidth={"100%"}
                title={"Following"}
                show={true}
                tailwindProps=" h-full"
              >
                <UserTabList
                  users={searchContext.userList}
                  filter="following"
                />
              </ResizableFrame>
            </>
          )}
        </div>
        <div className="xl:w-1/12 hidden lg:block pr-2 pl-2"></div>
      </div>
    </>
  );
};

export default Feed;
