import { IAppUserDisplay } from "../Models/UserModels";
import { dialogs } from "./AlertsConstant";

const colors = {
  Nav: "bg-lime-500 dark:bg-green-900",
  NavText: "dark:text-yellow-100 text-black",
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
export { colors, stringToAppUserDisplay, catchError };
