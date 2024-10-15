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
import { colors } from "../Constants/Patterns";
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

const Feed = () => {
  const searchContext = useSearch();

  useEffect(() => {
    updatePostList();
  }, []);

  const updatePostList = () => {
    searchContext.fillLists();
  };

  useEffect(() => {
    if (searchContext.postList.length > 0) {
      const newPostList = searchContext.postList;
      if (newPostList.length !== postList?.posts.length) {
        setPostList((prevPostList) => ({
          ...prevPostList,
          posts: newPostList,
        }));
      }
    }
  }, [searchContext.postList]);

  useEffect(() => {
    if (searchContext.userList.length > 0) {
      setLoadingUsers(false);
    }
  }, [searchContext.userList]);

  const [postList, setPostList] = useState<PostListValues | null>();
  const [feedSort, setFeedSort] = useState({
    totalVotes: false,
    datetime: true,
    comments: false,
  });
  const [feedDirection, setFeedDirection] = useState({
    ascending: true,
    descending: false,
  });

  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const toggleSort = (type: "totalVotes" | "datetime" | "comments") => {
    setFeedSort({
      totalVotes: false,
      datetime: false,
      comments: false,
      [type]: true,
    });
    updatePostList();
  };
  const toggleDirection = (type: "ascending" | "descending") => {
    setFeedDirection({
      ascending: false,
      descending: false,
      [type]: true,
    });
    updatePostList();
  };

  const IconSortButton: React.FC<IPostSortingProps> = (e) => {
    return (
      <button
        className={`${
          !e.activeHook
            ? colors.ButtonFont + " cursor-pointer"
            : colors.ButtonFontDisabled
        }`}
        disabled={e.activeHook}
        onClick={() => toggleSort(e.type)}
      >
        <Tooltip title={e.tooltip}>
          <e.icon size={24} />
        </Tooltip>
      </button>
    );
  };

  const IconDirectionButton: React.FC<IPostOrderProps> = (e) => {
    return (
      <button
        className={`${
          !e.activeHook
            ? colors.ButtonFont + " cursor-pointer"
            : colors.ButtonFontDisabled
        }`}
        disabled={e.activeHook}
        onClick={() => toggleDirection(e.type)}
      >
        <Tooltip title={e.tooltip}>
          <e.icon size={24} />
        </Tooltip>
      </button>
    );
  };
  useEffect(() => {
    if (searchContext.postList.length > 0) {
      const newPostList: PostListValues = {
        sortElement: feedSort.totalVotes
          ? "totalVotes"
          : feedSort.datetime
          ? "datetime"
          : "comments",
        orderBy: feedDirection.ascending ? "asc" : "desc",
        posts: searchContext.postList,
      };

      if (JSON.stringify(newPostList) !== JSON.stringify(postList)) {
        setPostList(newPostList);
      }
    }
  }, [feedDirection, feedSort, searchContext.postList]);

  useEffect(() => {
    if (postList && postList.posts.length > 0) {
      setLoadingPosts(false);
    }
  }, [postList]);

  return (
    <>
      <div className="flex flex-wrap justify-between">
        <div className="xl:w-1/12 hidden lg:block w-0/12 pr-2 pl-2"></div>
        <div className="lg:w-3/12 xl:w-2/12 hidden lg:block pr-2 pl-2">
          <UserLane />
        </div>
        <div className="xl:w-1/12 hidden lg:block w-0/12 pr-2 pl-2"></div>
        <div className="  lg:w-4/12 pl-2 pr-2  md:w-1/2 sm:w-full">
          <>
            <div
              className={`${colors.ElementFrame} rounded-b-xl flex-grow w-full`}
            >
              <div className="flex relative p-4 pb-4 flex-grow w-full ">
                <div className="flex items-center gap-4 rounded-xl w-full">
                  <IconSortButton
                    icon={FaCircleUp}
                    activeHook={feedSort.totalVotes}
                    type="totalVotes"
                    tooltip="Sort by popular"
                  />
                  <IconSortButton
                    icon={IoSparkles}
                    activeHook={feedSort.datetime}
                    type="datetime"
                    tooltip="Sort by recent"
                  />
                  <IconSortButton
                    icon={GoCommentDiscussion}
                    activeHook={feedSort.comments}
                    type="comments"
                    tooltip="Sort by comments"
                  />
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => updatePostList()}>
                    <Tooltip title="Sync">
                      <MdCloudSync size={26} />
                    </Tooltip>
                  </button>
                  <IconDirectionButton
                    icon={FaAngleDoubleUp}
                    activeHook={feedDirection.ascending}
                    type="ascending"
                    tooltip="Sort ascending"
                  />
                  <IconDirectionButton
                    icon={FaAngleDoubleDown}
                    activeHook={feedDirection.descending}
                    type="descending"
                    tooltip="Sort descending"
                  />
                </div>
              </div>
            </div>
            <SendPostComponent />
            <div className="-ml-2">
              {!loadingPosts && <PostList {...postList} />}
            </div>
          </>
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
