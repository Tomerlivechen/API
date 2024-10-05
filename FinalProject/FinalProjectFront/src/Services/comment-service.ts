import axios from "axios";
import { INewComment } from "../Models/CommentModels";

const baseURL = import.meta.env.VITE_BASE_URL + "/Comments";

const VoteOnComment = (token: string, Id: string, vote: number) => {
  axios
    .put(`${baseURL}/VoteById/${Id}`, vote, {
      headers: {
        Authorization: `Bearer ${token.replace(/"/g, "")}`,
      },
    })
    .then((response) => {
      return response;
    });
};

const PostComment = (token: string, newcomment: INewComment) => {
  axios
    .post(`${baseURL}`, newcomment, {
      headers: {
        Authorization: `Bearer ${token.replace(/"/g, "")}`,
      },
    })
    .then((response) => {
      return response;
    });
};

export const CommentService = { VoteOnComment, PostComment };
