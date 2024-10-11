import axios, { AxiosRequestConfig } from "axios";
import { dialogs } from "../Constants/AlertsConstant";

const baseUrl = import.meta.env.VITE_BASE_URL;
const client = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

const OnSuccess = (type: string, response) => {
  console.log(type, response);
  dialogs.success(type);
  return response;
};

const OnError = (type: string, error) => {
  console.error(type, error);
  dialogs.error(type);
  return error;
};

const SortResponse = (response) => {
  switch (response.status) {
    case 200:
      OnSuccess("Success", response);
      return response;
    case 201:
      OnSuccess("Created", response);
      return response;
    case 400:
      OnError("Bad request", response);
      return response;
    case 403:
      OnError("Forbidden", response);
      return response;
    case 404:
      OnError("Not Found", response);
      return response;
    case 405:
      OnError("Method not allowd", response);
      return response;
    case 415:
      OnError("Unsupported Media Type", response);
      return response;
    case 500:
      OnError("Internal server error", response);
      return response;
    default:
      OnError("Unknown error", response);
      return response;
  }
};

const request = (Options: AxiosRequestConfig) => {
  return client(Options).then(SortResponse).catch(SortResponse);
};

export { request };
