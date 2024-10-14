import { useEffect, useState } from "react";
import { IPostDisplay } from "../Models/Interaction";
import { sortByProperty } from "../Constants/Patterns";
import PostView from "../Constants/Objects/PostView";

export interface PostListValues {
  sortElement?: keyof IPostDisplay;
  orderBy?: string;
  posts: IPostDisplay[];
}

const PostList: React.FC<PostListValues> = (postListValue: PostListValues) => {
  const [posts, setPosts] = useState<IPostDisplay[]>(postListValue.posts);
  const order = postListValue.orderBy;
  const sort = postListValue.sortElement;
  const [sortedPosts, setSortedPosts] = useState<IPostDisplay[]>(
    postListValue.posts
  );
  useEffect(() => {
    if (order && sort) {
      const sorted = postListValue.posts.sort(sortByProperty(sort, order));
      setSortedPosts(sorted);
      console.log(postListValue.posts);
      console.log(sorted);
    } else {
      setSortedPosts(posts);
    }
  }, [postListValue]);

  return (
    <>
      <div>
        {sortedPosts.map((post) => (
          <div className="p-2">
            <PostView key={post.id} {...post} />
          </div>
        ))}
      </div>
    </>
  );
};

export { PostList };
