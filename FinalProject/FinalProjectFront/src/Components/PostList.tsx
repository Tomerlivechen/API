import { useEffect, useState } from "react";
import { IPostDisplay } from "../Models/Interaction";
import { sortByProperty } from "../Constants/Patterns";
import PostView from "../Constants/Objects/PostView";
import { PostListValues } from "../Constants/RoutrProtection/@types";

const PostList: React.FC<{ postListValue: PostListValues }> = ({
  postListValue,
}) => {
  const [posts, setPosts] = useState<IPostDisplay[]>(postListValue.posts);
  const order = postListValue.orderBy;
  const sort = postListValue.sortElement;
  const filterId = postListValue.filter;
  const [sortedPosts, setSortedPosts] = useState<IPostDisplay[]>(
    postListValue.posts
  );
  useEffect(() => {
    if (order && sort) {
      const sorted = postListValue.posts.sort(sortByProperty(sort, order));
      setSortedPosts(sorted);
      if (filterId) {
        const filtered = sorted.filter((post) => post.categoryId === filterId);
        setSortedPosts(filtered);
      }
      console.log(postListValue.posts);
      console.log(sorted);
    } else {
      setSortedPosts(posts);
      if (filterId) {
        const filtered = posts.filter((post) => post.categoryId === filterId);

        setSortedPosts(filtered);
      }
    }
  }, [postListValue]);

  return (
    <>
      <div>
        {sortedPosts.map((post) => (
          <div className="p-2" key={post.id}>
            <PostView {...post} />
          </div>
        ))}
      </div>
    </>
  );
};

export { PostList };
