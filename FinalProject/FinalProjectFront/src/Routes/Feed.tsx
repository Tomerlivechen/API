import React, { useEffect, useState } from "react";
import SendPostComponent from "../Components/SendPostComponent";
import ResizableFrame from "../Constants/Objects/ResizableFrame";
import { UserTabList } from "../Components/UserTabList";
import { useSearch } from "../CustomHooks/useSearch";
import { useNavigate, useParams } from "react-router-dom";
import { FaGripfire } from "react-icons/fa6";
import { FaAngleDoubleDown } from "react-icons/fa";
import { PostList, PostListValues } from "../Components/PostList";
import { FaAngleDoubleUp } from "react-icons/fa";
import { IPostDisplay } from "../Models/Interaction";
import { colors, getFlowingPosts } from "../Constants/Patterns";
import { Tooltip } from "react-bootstrap";
import { IoSparkles } from "react-icons/io5";
import { GoCommentDiscussion } from "react-icons/go";
import { FaCircleUp } from "react-icons/fa6";
import UserLane from "../Constants/Objects/UserLane";
import { MdCloudSync } from "react-icons/md";
import {
  IPostOrderProps,
  IPostSortingProps,
} from "../Constants/RoutrProtection/@types";
import { PostFrame } from "../Constants/Objects/PostFrame";

const Feed = () => {
  const searchContext = useSearch();

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
        </div>
        <div className="xl:w-1/12 hidden lg:block w-0/12 pr-2 pl-2"></div>
        <div className="  lg:w-4/12 pl-2 pr-2  md:w-1/2 sm:w-full">
          <div>
            <PostFrame UserList={[]} />
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
