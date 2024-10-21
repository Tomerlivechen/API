import { useEffect, useState } from "react";
import { Tooltip } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import {
  categories,
  colors,
  getFlowingPosts,
  stringToPostDisplay,
} from "../Patterns";
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
import { PostList } from "../../Components/PostList";
import { Posts } from "../../Services/post-service";
import { useUser } from "../../CustomHooks/useUser";
import { IPostDisplay } from "../../Models/Interaction";
import ClipSpinner from "../../Spinners/ClipSpinner";

interface IPostFrameParams {
  UserList: string[];
}
const PostFrame: React.FC<IPostFrameParams | null> = (PostFrameParams) => {
  const location = useLocation();
  const userContex = useUser();
  const { params } = useParams();
  const [userIdState, setUserIdState] = useState<string | null>(null);
  const [groupIdState, setGroupIdState] = useState<string | null>(null);
  const [usersIds, setusersIds] = useState<string[] | null>(
    PostFrameParams?.UserList ? PostFrameParams?.UserList : null
  );
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [postList, setPostList] = useState<PostListValues | null>();
  const [mainPostList, setMainPostList] = useState<IPostDisplay[] | null>();
  const [catFilter, setCatFilter] = useState<number>(0);
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
    let currentProfileUserId: string | null =
      userIdState || userContex.userInfo.UserId;

    const updatePostListIfChanged = (posts: IPostDisplay[]) => {
      const parsedPosts = stringToPostDisplay(posts);
      if (parsedPosts !== postList?.posts) {
        setMainPostList(
          Array.isArray(parsedPosts) ? parsedPosts : [parsedPosts]
        );
      }
    };

    if (location.pathname.startsWith("/Group") && groupIdState) {
      const groupPosts = await Posts.GetGroupPosts(groupIdState);
      updatePostListIfChanged(groupPosts?.data);
      currentProfileUserId = null;
    } else if (location.pathname === "/Feed" && !params) {
      const followingPosts = await getFlowingPosts(usersIds);
      updatePostListIfChanged(followingPosts);
      currentProfileUserId = null;
    } else if (location.pathname.startsWith("/Feed") && params) {
      const followingPosts = await Posts.getPostById(params);
      updatePostListIfChanged(followingPosts);
      currentProfileUserId = null;
    }

    if (currentProfileUserId) {
      const userPosts = await Posts.GetAuthorPosts(currentProfileUserId);
      updatePostListIfChanged(userPosts?.data);
    }
  };

  useEffect(() => {
    if (params) {
      if (location.pathname.startsWith("/Profile")) {
        setUserIdState(params);
      } else if (location.pathname.startsWith("/Group")) {
        setGroupIdState(params);
      }
    } else {
      setUserIdState(null);
    }
  }, []);

  useEffect(() => {
    if (mainPostList && !params) {
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
        filter: catFilter == 0 ? null : catFilter,
      };

      if (JSON.stringify(newPostList) !== JSON.stringify(postList)) {
        setPostList(newPostList);
      }
    }
  }, [feedDirection, feedSort, mainPostList, catFilter]);

  useEffect(() => {
    if (postList && postList.posts.length > 0) {
      setLoadingPosts(false);
    }
  }, [postList]);

  return (
    <>
      <div className="flex flex-col">
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
        <select
          className={`rounded-md border-2 px-2 py-2  ${colors.ElementFrame} font-bold w-[25rem] `}
          id="category"
          name="category"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCatFilter(Number(e.target.value))
          }
        >
          <option value={0} className={`${colors.ElementFrame} font-bold`}>
            Category filter
          </option>
          {categories.map((category) => (
            <option
              className={`${colors.ElementFrame} font-bold`}
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
        {!userIdState && <SendPostComponent />}
        <div className="w-full">
          {!loadingPosts && postList && <PostList postListValue={postList} />}
          {loadingPosts && <ClipSpinner />}
        </div>
      </div>
    </>
  );
};

export { PostFrame };
