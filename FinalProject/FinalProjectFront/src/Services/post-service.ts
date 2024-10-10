
import { INewPost, IPostDisplay } from "../Models/Interaction";
import { request } from "../Utils/Axios-Interceptor";

const postURL = "/posts";


const getPosts = () =>
  request({
    url: `${postURL}`,
    method: "GET",
    data: null,
  });

  const postPost = (Post: INewPost) =>
    request({
      url: `${postURL}`,
      method: "POST",
      data: Post,
    });


    const VoteOnPost = (Id: string, vote: number) =>
      request({
        url: `${postURL}/VoteById/${Id}`,
        method: "PUT",
        data: vote,
      });
  
      const EditPost = ( post: IPostDisplay) =>
        request({
          url: `${postURL}/${post.id}`,
          method: "PUT",
          data: post,
        });

export { getPosts, postPost, VoteOnPost , EditPost };

export const Posts = { getPosts, postPost, VoteOnPost , EditPost };
