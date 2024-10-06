
import { INewComment } from "../Models/CommentModels";
import { request } from "../Utils/Axios-Interceptor";

const CommentURL = "/Comments";


const VoteOnComment = (Id: string, vote: number) =>
  request({
    url: `${CommentURL}/VoteById/${Id}`,
    method: "PUT",
    data: vote,
  });

  const PostComment = (newcomment: INewComment) =>
    request({
      url: `${CommentURL}`,
      method: "POST",
      data: newcomment,
    });



export const CommentService = { VoteOnComment, PostComment };
