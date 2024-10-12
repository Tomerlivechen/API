import React, { useEffect, useState } from "react";
import SendPostComponent from "../Components/SendPostComponent";
import ResizableFrame from "../Constants/Objects/ResizableFrame";
import { UserTabList } from "../Components/UserTabList";
import { useSearch } from "../CustomHooks/useSearch";
import { useNavigate, useParams } from "react-router-dom";
import { FaGripfire } from "react-icons/fa6";
import { FaAngleDoubleDown } from "react-icons/fa";
import { PostList } from "../Components/PostList";
import { FaAngleDoubleUp } from "react-icons/fa";
import { IPostDisplay } from "../Models/Interaction";
import { colors } from "../Constants/Patterns";
import { Tooltip } from "react-bootstrap";
import { IoSparkles } from "react-icons/io5";
import { GoCommentDiscussion } from "react-icons/go";
import { FaCircleUp } from "react-icons/fa6";

interface IPostSortingProps {
  icon: React.ComponentType<{ size: number }>;
  activeHook: boolean;
  type: "totalVotes" | "datetime" | "controversial";
  tooltip: string;
}

interface IPostOrderProps {
  icon: React.ComponentType<{ size: number }>;
  activeHook: boolean;
  type: "ascending" | "descending";
  tooltip: string;
}

interface PostListValues {
  sortElement?: keyof IPostDisplay;
  orderBy?: string;
  posts: IPostDisplay[];
}

const Feed = () => {
  const searchContext = useSearch();

  useEffect(() => {
    searchContext.fillLists();
  }, []);

  useEffect(() => {
    setLoadingUsers(false);
  }, [searchContext.userList]);

  const [postList, setPostList] = useState<PostListValues | null>();
  const [feedSort, setFeedSort] = useState({
    totalVotes: false,
    datetime: true,
    controversial: false,
  });
  const [feedDirection, setFeedDirection] = useState({
    ascending: true,
    descending: false,
  });

  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const toggleSort = (type: "totalVotes" | "datetime" | "controversial") => {
    setFeedSort({
      totalVotes: false,
      datetime: false,
      controversial: false,
      [type]: true,
    });
  };
  const toggleDirection = (type: "ascending" | "descending") => {
    setFeedDirection({
      ascending: false,
      descending: false,
      [type]: true,
    });
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
    if (
      searchContext.postList.length > 0 &&
      feedDirection.ascending &&
      feedSort
    ) {
      const order = feedDirection.ascending ? "asc" : "desc";
      let activeSort = Object.entries(feedSort).find(([key, value]) => value);
      console.log(searchContext.postList);
      if (activeSort && activeSort[0] === "controversial") {
        activeSort[0] = "comments.length";
      }
      if (activeSort && searchContext.postList && order) {
        const newPostList = {
          sortElement: activeSort[0] as keyof IPostDisplay,
          orderBy: order,
          posts: searchContext.postList,
        };
        console.log(newPostList);
        if (newPostList !== postList) {
          setPostList(newPostList);
        }
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
        <div className="w-2/12 pr-2 pl-2"></div>
        <div className="w-2/12 pr-2 pl-2"></div>

        <div className="w-3/12 pl-2 pr-2">
          <>
            <div className={`${colors.ElementFrame} rounded-b-xl`}>
              <div className="flex justify-between items-center p-4 pr-1">
                <div className="flex items-center gap-4 rounded-xl ">
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
                    activeHook={feedSort.controversial}
                    type="controversial"
                    tooltip="Sort by controversial"
                  />
                </div>
                <div className="flex space-x-2">
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
              {!loadingPosts && <PostList {...(postList as PostListValues)} />}
            </div>
          </>
        </div>
        <div className="w-2/12 pl-2 pr-2 top-0 right-0 ">
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
        <div className="w-2/12 pr-2 pl-2"></div>
      </div>
    </>
  );
};

export default Feed;
