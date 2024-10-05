import { Post } from "routing-controllers";
import axios from "axios";
import { INewPost } from "../Models/Interaction";

const baseURL = import.meta.env.VITE_BASE_URL + "/posts";

const getPosts = (token: string) =>
  axios
    .get(`${baseURL}/`, {
      headers: {
        Authorization: `Bearer ${token.replace(/"/g, "")}`,
      },
    })
    .then((response) => {
      return response.data;
    });

const postPost = (token: string, Post: INewPost) =>
  axios
    .post(`${baseURL}/`, Post, {
      headers: {
        Authorization: `Bearer ${token.replace(/"/g, "")}`,
      },
    })
    .then((response) => {
      return response;
    });

const VoteOnPost = (token: string, Id: string, vote: number) => {
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

export { getPosts, postPost, VoteOnPost };

export const Posts = { getPosts, postPost, VoteOnPost };
