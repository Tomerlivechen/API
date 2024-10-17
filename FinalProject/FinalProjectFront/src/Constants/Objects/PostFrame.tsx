import { useEffect, useState } from "react";
import { Tooltip } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { colors, getFlowingPosts, stringToPostDisplay } from "../Patterns";
import {
  IPostOrderProps,
  IPostSortingProps,
  PostListValues,
} from "../RoutrProtection/@types";
import { FaCircleUp } from "react-icons/fa6";
import { IoSparkles } from "react-icons/io5";
import { GoCommentDiscussion } from "react-icons/go";
import { MdCloudSync } from "react-icons/md";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";
import SendPostComponent from "../../Components/SendPostComponent";
import { useSearch } from "../../CustomHooks/useSearch";
import { PostList } from "../../Components/PostList";
import { Posts } from "../../Services/post-service";
import { useLogin } from "../../CustomHooks/useLogin";
import { useUser } from "../../CustomHooks/useUser";
import { IPostDisplay } from "../../Models/Interaction";

interface IPostFrameParams {
  UserList: string[];
}
const PostFrame: React.FC<IPostFrameParams | null> = (PostFrameParams) => {
  const location = useLocation();
  const userContex = useUser();
  const { userId } = useParams();
  const [userIdState, setUserIdState] = useState<string | null>(
    userId ? userId : null
  );
  const [usersIds, setusersIds] = useState<string[] | null>(
    PostFrameParams?.UserList ? PostFrameParams?.UserList : null
  );
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postList, setPostList] = useState<PostListValues | null>();
  const [mainPostList, setMainPostList] = useState<IPostDisplay[] | null>();
  const [feedSort, setFeedSort] = useState({
    totalVotes: false,
    datetime: true,
    comments: false,
  });
  const [feedDirection, setFeedDirection] = useState({
    ascending: true,
    descending: false,
  });

  useEffect(() => {
    updatePostList();
  }, []);

  useEffect(() => {
    if (PostFrameParams) {
      setusersIds(PostFrameParams.UserList);
    }
  }, [PostFrameParams]);

  const updatePostList = async () => {
    let curerntUserUserId: string | null;
    if (location.pathname.startsWith("/Group") && userIdState) {
      const groupPostData = await Posts.GetGroupPosts(userIdState);
      let groupPosts;
      if (groupPostData !== null) {
        groupPosts = groupPostData.data;
      } else {
        groupPosts = null;
      }
      const parsedPosts = stringToPostDisplay(groupPosts);
      if (parsedPosts !== postList?.posts) {
        setMainPostList(
          Array.isArray(parsedPosts) ? parsedPosts : [parsedPosts]
        );
      }
      curerntUserUserId = null;
    } else {
      if (userId) {
        curerntUserUserId = userId;
        console.log(curerntUserUserId);
      } else {
        if (location.pathname == "/Feed") {
          const following: IPostDisplay[] | null = await getFlowingPosts(
            usersIds
          );
          const parsedPosts = stringToPostDisplay(following);
          if (parsedPosts !== postList?.posts) {
            setMainPostList(
              Array.isArray(parsedPosts) ? parsedPosts : [parsedPosts]
            );
          }
          curerntUserUserId = null;
        } else {
          curerntUserUserId = userContex.userInfo.UserId;
          console.log(curerntUserUserId);
        }
      }
    }

    if (curerntUserUserId) {
      await Posts.GetAuthorPosts(curerntUserUserId).then((response) => {
        console.log("respons", response);
        const parsedPosts = stringToPostDisplay(response.data);
        if (parsedPosts !== postList?.posts) {
          setMainPostList(
            Array.isArray(parsedPosts) ? parsedPosts : [parsedPosts]
          );
        }
      });
    }
  };

  useEffect(() => {
    if (userId) {
      setUserIdState(userId);
    } else {
      setUserIdState(null);
    }
  }, []);

  useEffect(() => {
    if (mainPostList && !userId) {
      const newPostList = mainPostList;
      if (newPostList.length !== postList?.posts.length) {
        setPostList((prevPostList) => ({
          ...prevPostList,
          posts: newPostList,
        }));
      }
    }
  }, [mainPostList]);

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
    if (mainPostList) {
      const newPostList: PostListValues = {
        sortElement: feedSort.totalVotes
          ? "totalVotes"
          : feedSort.datetime
          ? "datetime"
          : "comments",
        orderBy: feedDirection.ascending ? "asc" : "desc",
        posts: mainPostList,
      };

      if (JSON.stringify(newPostList) !== JSON.stringify(postList)) {
        setPostList(newPostList);
      }
    }
  }, [feedDirection, feedSort, mainPostList]);

  useEffect(() => {
    if (postList && postList.posts.length > 0) {
      setLoadingPosts(false);
    }
  }, [postList]);

  return (
    <>
      <div
        className={`${colors.ElementFrame} h-14 w-fit flex justify-between p-4 pb-4  gap-4 rounded-b-xl `}
      >
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
        <div className="flex-1 w-32"></div>
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
      {!userId && <SendPostComponent />}
      <div className="w-full">
        {!loadingPosts && <PostList {...postList} />}
      </div>
    </>
  );
};

export { PostFrame };
