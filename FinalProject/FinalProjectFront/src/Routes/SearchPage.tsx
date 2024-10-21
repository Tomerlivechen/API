import React, { useEffect, useState } from "react";
import { useLogin } from "../CustomHooks/useLogin";
import { useSearch } from "../CustomHooks/useSearch";
import UserCard from "../Constants/Objects/UserCard";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";
import SearchTitleComponent from "../Components/SearchTitleComponent";
import PostCard from "../Constants/Objects/PostCard";
import ElementFrame from "../Constants/Objects/ElementFrame";

function SearchPage() {
  const loggedInContext = useLogin();
  const searchContext = useSearch();
  const [activeSearch, setActiveSearch] = useState("");

  useEffect(() => {
    const { userSearch, postSearch } = searchContext;

    if (Object.values(userSearch).some((value) => value)) {
      setActiveSearch("user");
    } else if (Object.values(postSearch).some((value) => value)) {
      setActiveSearch("post");
    }
  }, [searchContext.userSearch, searchContext.postSearch]);

  useEffect(() => {
    searchContext.fillLists();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center pt-11">
        <SearchTitleComponent />
      </div>

      {searchContext.loadingData && (
        <div className=" flex flex-col items-center">
          <ClimbBoxSpinner /> <br />
        </div>
      )}
      <div className=" flex flex-col items-center">
        <ElementFrame tailwind={`h-2/3 w-2/3 `} padding="2" overflowY="auto">
          {activeSearch == "user" && (
            <div className=" flex flex-col items-center">
              {searchContext.filterUserList.map((user) => (
                <>
                  <UserCard key={user.id} UserDisplay={user} />
                  <hr />
                </>
              ))}
            </div>
          )}
          {activeSearch == "post" && (
            <div className=" flex flex-col items-center">
              {searchContext.filterPostList.map((post) => (
                <>
                  <div className="pt-5 ">
                    <PostCard key={post.id} {...post} />
                  </div>
                </>
              ))}
            </div>
          )}
        </ElementFrame>
      </div>
    </>
  );
}

export { SearchPage };
