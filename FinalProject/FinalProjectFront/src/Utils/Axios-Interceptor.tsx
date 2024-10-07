import axios, { AxiosRequestConfig } from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const client = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const OnSuccess = (response) => {
  console.log("Request successfull", response);
  return response;
};

const OnError = (error) => {
  console.error("Request successfull", error);
  return error;
};

const request = (Options: AxiosRequestConfig) => {
  return client(Options).then(OnSuccess).catch(OnError);
};

export { request };