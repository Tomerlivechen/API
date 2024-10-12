import { createContext, useEffect, useState } from "react";
import { IAppUserDisplay } from "../Models/UserModels";
import { IPostDisplay } from "../Models/Interaction";
import { auth } from "../Services/auth-service";

import {
  catchError,
  stringToAppUserDisplay,
  stringToPostDisplay,
} from "../Constants/Patterns";
import { Posts } from "../Services/post-service";

interface IUserSelector {
  UserName: boolean;
  FirstName: boolean;
  LastName: boolean;
}

interface IPostSelector {
  UserName: boolean;
  Title: boolean;
  KeyWords: boolean;
}

const ValuesPost: IPostSelector = {
  UserName: false,
  Title: false,
  KeyWords: false,
};

const ValuesUser: IUserSelector = {
  UserName: false,
  FirstName: false,
  LastName: false,
};

interface ISearchToggleFunctions {
  toggleUserSearch: (key: keyof IUserSelector | null) => void;
  togglePostSearch: (key: keyof IPostSelector | null) => void;
}

const SearchToggle: ISearchToggleFunctions = {
  toggleUserSearch: function (key: keyof IUserSelector | null): void {
    throw new Error("Function not implemented.");
  },
  togglePostSearch: function (key: keyof IPostSelector | null): void {
    throw new Error("Function not implemented.");
  },
};

const searchTermBase = "";

const SearchContext = createContext({
  postSearch: ValuesPost,
  userSearch: ValuesUser,
  searchToggleFunctions: SearchToggle,
  searchValue: searchTermBase,
  setSearchValue: (searchTerm: string) => {},
  userList: [] as IAppUserDisplay[],
  postList: [] as IPostDisplay[],
  filterUserList: [] as IAppUserDisplay[],
  filterPostList: [] as IPostDisplay[],
  fillLists: () => {},
  filterUsers: () => {},
  filterPosts: () => {},
  loadingData: false,
});

function SearchProvider({ children }) {
  const [postSearch, setPostSearch] = useState(ValuesPost);
  const [userSearch, setUserSearch] = useState(ValuesUser);
  const [searchValue, setSearchValue] = useState(searchTermBase);
  const [userList, setUserList] = useState<IAppUserDisplay[]>([]);
  const [postList, setPostList] = useState<IPostDisplay[]>([]);
  const [loadingData, setloadingData] = useState(true);
  const [filterUserList, setFilterUserList] = useState<IAppUserDisplay[]>([]);
  const [filterPostList, setFilterPostList] = useState<IPostDisplay[]>([]);

  useEffect(() => {
    setFilterUserList([]);
    setFilterPostList([]);
  }, [userSearch, postSearch]);

  useEffect(() => {
    fillLists();
  }, [postSearch, userSearch]);

  const fillLists = () => {
    auth
      .getUsers()
      .then((response) => {
        console.log("respons", response);
        const parsedUsers = stringToAppUserDisplay(response.data);
        setUserList(Array.isArray(parsedUsers) ? parsedUsers : [parsedUsers]);
      })
      .catch((error) => {
        catchError(error, "Getting users");
      });

    Posts.getPosts()
      .then((response) => {
        console.log("respons", response);
        const parsedPosts = stringToPostDisplay(response.data);
        setPostList(Array.isArray(parsedPosts) ? parsedPosts : [parsedPosts]);
      })
      .catch((error) => {
        catchError(error, "Getting Posts");
      });
  };

  const filterUsers = () => {
    setloadingData(true);
    let filtering = userList;
    if (userList != null) {
      if (userSearch.FirstName) {
        filtering = userList.filter((user) =>
          user.first_Name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      if (userSearch.LastName) {
        filtering = userList.filter((user) =>
          user.last_Name.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      if (userSearch.UserName) {
        filtering = userList.filter((user) =>
          user.userName.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      console.log(searchValue);
      console.log(userSearch);
      console.log(filtering);
      setFilterUserList(filtering);
      setloadingData(false);
    }
  };

  const filterPosts = () => {
    setloadingData(true);
    let filtering = postList;
    if (postList != null) {
      if (postSearch.UserName) {
        filtering = postList.filter((post) =>
          post.authorName.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      if (postSearch.Title) {
        filtering = postList.filter((post) =>
          post.title.toLowerCase().includes(searchValue.toLowerCase())
        );
      }
      if (postSearch.KeyWords) {
        const firstFilter = postList.filter((post) => post.keyWords != null);
        filtering = firstFilter.filter((post) =>
          post.keyWords!.some((keyword) =>
            keyword.toLowerCase().includes(searchValue.toLowerCase())
          )
        );
      }
      console.log(searchValue);
      console.log(userSearch);
      console.log(filtering);
      setFilterPostList(filtering);
      setloadingData(false);
    }
  };

  const toggleUserSearch = (key: keyof IUserSelector | null) => {
    if (key == null) {
      setUserSearch({
        UserName: false,
        FirstName: false,
        LastName: false,
      });
    } else {
      setUserSearch({
        UserName: false,
        FirstName: false,
        LastName: false,
        [key]: true,
      });
    }
  };

  const togglePostSearch = (key: keyof IPostSelector | null) => {
    if (key == null) {
      setPostSearch({
        UserName: false,
        Title: false,
        KeyWords: false,
      });
    } else {
      setPostSearch({
        UserName: false,
        Title: false,
        KeyWords: false,
        [key]: true,
      });
    }
  };

  const searchToggleFunctions = {
    toggleUserSearch,
    togglePostSearch,
  };

  return (
    <SearchContext.Provider
      value={{
        postSearch,
        userSearch,
        searchToggleFunctions,
        searchValue,
        setSearchValue,
        fillLists,
        filterUsers,
        filterPosts,
        filterUserList,
        filterPostList,
        loadingData,
        userList,
        postList,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };
