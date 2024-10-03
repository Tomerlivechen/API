import React, { useEffect } from "react";
import { useLogin } from "../CustomHooks/useLogin";
import { useSearch } from "../CustomHooks/useSearch";
import UserCard from "../Constants/Objects/UserCard";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";
import SearchTitleComponent from "../Components/SearchTitleComponent";

function SearchPage() {
  const loggedInContext = useLogin();

  const searchContext = useSearch();
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
        {searchContext.filterUserList.map((user) => (
          <UserCard key={user.id} UserDisplay={user} />
        ))}
      </div>
    </>
  );
}

export { SearchPage };
