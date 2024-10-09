import { useContext } from "react";
import { PostsContext } from "../ContextAPI/PostsContexrt";

const usePosts = () => {
  const postsContext = useContext(PostsContext);
  if (!postsContext) {
    throw new Error("PostsContext must be within PostsProvider");
  }
  return postsContext;
};

export { usePosts };
