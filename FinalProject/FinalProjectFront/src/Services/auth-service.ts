import axios from "axios";
import { AppUserRegister, IAppUserRegister } from "../Medels/AuthModels";

const baseURL = "https://localhost:7006/api/Auth";

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
export { register, login };

export const auth = { register, login };
