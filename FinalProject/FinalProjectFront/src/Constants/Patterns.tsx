import { IPostDisplay } from "../Models/Interaction";
import { IAppUserDisplay } from "../Models/UserModels";
import { dialogs } from "./AlertsConstant";

const colors = {
   Nav: "bg-teal-400 dark:bg-green-900",
 Filter: "bg-teal-500 dark:bg-green-950",
   NavText: "dark:text-yellow-100 text-black",
   SearchButtonActive:
     "bg-teal-700 text-black font-bold dark:bg-green-950 dark:text-yellow-100",
   ActiveText: "text-black font-bold  dark:text-yellow-100",
   CommentColors : "",
   PostColors : "",
   ElementFrame:"bg-gradient-to-r from-blue-100 to-purple-50 text-blue-900 dark:bg-gradient-to-b from-blue-900 to-purple-900 dark:text-yellow-400 " ,
   TextBox:"bg-blue-100 text-gray-800 dark:bg-blue-800 dark:text-yellow-300",
   Buttons:"bg-gradient-to-r from-blue-100 to-purple-50 text-blue-900 dark:bg-gradient-to-b from-blue-900 to-purple-900 dark:text-yellow-400 ",
   ButtonFont:"text-blue-900 dark:text-yellow-400"

};



const stringToAppUserDisplay = (
  userDisplay: IAppUserDisplay | IAppUserDisplay[] | undefined
): IAppUserDisplay | IAppUserDisplay[] => {
  if (!userDisplay) {
    throw new Error("UserDisplay cannot be null or undefined");
  }
  if (Array.isArray(userDisplay)) {
    return userDisplay;
  } else {
    return userDisplay;
  }
};

const stringToPostDisplay = (
  postDisplay: IPostDisplay | IPostDisplay[] | undefined
): IPostDisplay | IPostDisplay[] => {
  if (!postDisplay) {
    throw new Error("PostDisplay cannot be null or undefined");
  }
  if (Array.isArray(postDisplay)) {
    return postDisplay;
  } else {
    return postDisplay;
  }
};

const catchError = (error: any, action: string) => {
  if (error && error.response && error.response.data) {
    const errorMessages = error.response.data[`${action} Failed`];
    if (Array.isArray(errorMessages)) {
      const message = errorMessages.join(" & ");
      dialogs.error(message);
    } else {
      dialogs.error("An unknown error occurred.");
    }
  } else {
    dialogs.error("An error occurred. Please try again.");
  }
};
export { colors, stringToAppUserDisplay, catchError, stringToPostDisplay };
