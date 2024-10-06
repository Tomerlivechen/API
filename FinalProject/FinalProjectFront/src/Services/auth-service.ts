import axios from "axios";
import { request } from "../Utils/Axios-Interceptor";

const baseURL = import.meta.env.VITE_BASE_URL;

const AuthURL = "/Auth";



const register = (
  email: string,
  userName: string,
  password: string,
  prefix: string,
  first_Name: string,
  last_Name: string,
  pronouns: string,
  imageURL: string,
  permissionLevel: string
) =>
  axios.post(`${baseURL}${AuthURL}/register`, {
    email: email,
    userName: userName,
    password: password,
    prefix: prefix,
    first_Name: first_Name,
    last_Name: last_Name,
    pronouns: pronouns,
    imageURL: imageURL,
    permissionLevel: permissionLevel,
  });
const login = (email: string, password: string) =>
  axios.post(`${baseURL}${AuthURL}/login`, { email, password }).then((response) => {
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response;
  });

  const validate = () =>
    request({
      url: `${AuthURL}/validateToken`,
      method: "GET",
      data: null,
    });


    const getUser = (id: string) =>
      request({
        url: `${AuthURL}/GetUser`,
        method: "POST",
        data: {id},
      });


    const getUsers = () =>
      request({
        url: `${AuthURL}/GetUsers`,
        method: "GET",
        data: null,
      });
    
      const follow = (id: string) =>
        request({
          url: `${AuthURL}/follow`,
          method: "PUT",
          data: {id},
        });

    
        const unfollow = (id: string) =>
          request({
            url: `${AuthURL}/unfollow`,
            method: "PUT",
            data: {id},
          });

          const block = (id: string) =>
            request({
              url: `${AuthURL}/block`,
              method: "PUT",
              data: {id},
            });

            const unBlock = (id: string) =>
              request({
                url: `${AuthURL}/unblock`,
                method: "PUT",
                data: {id},
              });



export { register, login, validate, getUser, follow, unfollow, block, unBlock };

export const auth = {
  register,
  login,
  validate,
  getUser,
  getUsers,
  follow,
  unfollow,
  block,
  unBlock,
};
