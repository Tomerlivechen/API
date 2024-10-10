import { FormikValues } from "formik";
import { IPostDisplay } from "../Models/Interaction";
import { IAppUserDisplay } from "../Models/UserModels";
import { dialogs } from "./AlertsConstant";
import { MYFormikValues } from "./FormikElementBuilder";

const colors = {
//    Nav: "bg-teal-400 dark:bg-green-900",
//  Filter: "bg-teal-500 dark:bg-green-950",
//    NavText: "dark:text-yellow-100 text-black",
//    SearchButtonActive:
//      "bg-teal-700 text-black font-bold dark:bg-green-950 dark:text-yellow-100",
//    ActiveText: "text-black font-bold  dark:text-yellow-100",
//    CommentColors : "",
//    PostColors : "",
//    ElementFrame:"bg-gradient-to-r from-blue-100 to-purple-50 text-blue-900 dark:bg-gradient-to-b from-blue-900 to-purple-900 dark:text-yellow-400 " ,
//    TextBox:"bg-blue-100 text-gray-800 dark:bg-blue-800 dark:text-yellow-300",
//    Buttons:"bg-gradient-to-r from-blue-100 to-purple-50 text-blue-900 dark:bg-gradient-to-b from-blue-900 to-purple-900 dark:text-yellow-400 ",
//    ButtonFont:"text-blue-900 dark:text-yellow-400"
Nav: "bg-blue-300 dark:bg-gray-800", // Blue for professionalism and trust, with a neutral dark gray for dark mode
Filter: "bg-orange-400 dark:bg-gray-700", // Orange adds energy and warmth to the more serious blue, creating contrast
NavText: "dark:text-gray-100 text-gray-900", // Gray tones for text to remain neutral and readable
SearchButtonActive: 
  "bg-blue-500 text-white font-bold dark:bg-orange-500 dark:text-gray-100", // Blue for active states, switching to vibrant orange in dark mode
ActiveText: "text-blue-700 font-bold dark:text-orange-300", // Subtle blue tone for light mode, with orange for contrast in dark mode
CommentColors: "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200", // Neutral for content-focused sections like comments
PostColors: "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300", // Simple, clean background for posts to highlight content
ElementFrame: "bg-blue-100 text-blue-900 dark:bg-gray-900 dark:text-orange-400", // Solid, professional look with subtle pops of color
TextBox: "bg-gray-50 text-gray-800 dark:bg-blue-900 dark:text-gray-300", // Calming blue tones for input fields, enhancing focus
Buttons: "bg-blue-500 text-white dark:bg-orange-600 dark:text-gray-100", // Action buttons use blue in light mode and warm orange in dark mode
ButtonFont: "text-blue-900 dark:text-orange-400", // High contrast for readability across different button states
InteractionText:"text-blue-900 dark:text-orange-400",
FormikDiv:"font-extralight form-group flex flex-col gap-2 mx-auto text-lg mt-5",
ForkikField: "rounded-md hover:border-2 border-2 px-2 py-2"

};


export const linkFieldValues : MYFormikValues = {
  element  : "link",
  type : "text",
  placeholder : "Link (optional)",
  required : false,
  hidden : false,
  textbox : true,
  width : "full"
  }
  export const imageFieldValues : MYFormikValues = {
    element  : "imageURL",
    type : "hidden",
    placeholder : "",
    required : false,
    hidden : true,
    }

    export const textFieldValues : MYFormikValues = {
      element  : "text",
      type : "text",
      placeholder : "Text",
      required : true,
      hidden : false,
      as : "textarea",
      classes : `${colors.TextBox} h-20 overflow-y-auto whitespace-pre-wrap resize-none`,
      width : "full"
      }

 export const sortByProperty = (property: keyof IPostDisplay, order: string = "asc") => {
  return (a: IPostDisplay, b: IPostDisplay) => {
    const valueA = a[property];
    const valueB = b[property];

    if (valueA == null && valueB == null) return 0;
    if (valueA == null) return order === "asc" ? -1 : 1;
    if (valueB == null) return order === "asc" ? 1 : -1;

    if (typeof valueA === "number" && typeof valueB === "number") {
      return order === "asc" ? valueA - valueB : valueB - valueA;
    }
    if (typeof valueA === "string" && typeof valueB === "string") {
      return order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }

    return 0;
  };
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
