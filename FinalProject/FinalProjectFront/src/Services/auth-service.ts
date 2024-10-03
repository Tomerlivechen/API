import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL + "/Auth";

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
  axios.post(`${baseURL}/register`, {
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
  axios.post(`${baseURL}/login`, { email, password }).then((response) => {
    if (response.data.token) {
      localStorage.setItem("token", JSON.stringify(response.data.token));
    }
    return response;
  });

const validate = (token: string) => {
  return axios.get(`${baseURL}/validateToken`, {
    headers: {
      Authorization: `Bearer ${token.replace(/"/g, "")}`,
    },
  });
};

const getUser = (token: string, id: string) =>
  axios
    .post(
      `${baseURL}/GetUser`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, "")}`,
        },
      }
    )
    .then((response) => {
      return response.data;
    });
const getUsers = (token: string) =>
  axios
    .get(`${baseURL}/GetUsers`, {
      headers: {
        Authorization: `Bearer ${token.replace(/"/g, "")}`,
      },
    })
    .then((response) => {
      return response.data;
    });

const follow = (token: string, id: string) =>
  axios
    .put(
      `${baseURL}/follow`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, "")}`,
        },
      }
    )
    .then((response) => {
      return response;
    });

const unfollow = (token: string, id: string) =>
  axios
    .put(
      `${baseURL}/unfollow`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, "")}`,
        },
      }
    )
    .then((response) => {
      return response;
    });

const block = (token: string, id: string) =>
  axios
    .put(
      `${baseURL}/block`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, "")}`,
        },
      }
    )
    .then((response) => {
      return response;
    });

const unBlock = (token: string, id: string) =>
  axios
    .put(
      `${baseURL}/unblock`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${token.replace(/"/g, "")}`,
        },
      }
    )
    .then((response) => {
      return response;
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
