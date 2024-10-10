
import { INewComment } from "../Models/CommentModels";
import { ICommentDisplay } from "../Models/Interaction";
import { request } from "../Utils/Axios-Interceptor";

const CommentURL = "/Comments";


const VoteOnComment = (Id: string, vote: number) =>
  request({
    url: `${CommentURL}/VoteById/${Id}`,
    method: "PUT",
    data: vote,
  });

  const DeleteComment = (Id: string) =>
    request({
      url: `${CommentURL}/${Id}`,
      method: "Delete",
      data: null,
    });
  const PostComment = (newcomment: INewComment) =>
    request({
      url: `${CommentURL}`,
      method: "POST",
      data: newcomment,
    });
    const PutComment = (Editcomment: ICommentDisplay) => {
      let parentid;
      if (Editcomment.parentCommentId) {
      parentid = Editcomment.parentCommentId;
      }
    else{
    parentid = Editcomment.parentPostId
    }
      request({
        url: `${CommentURL}/${parentid}`,
        method: "PUT",
        data: Editcomment,
      });
    }


export const CommentService = { VoteOnComment, PostComment , PutComment,DeleteComment };
