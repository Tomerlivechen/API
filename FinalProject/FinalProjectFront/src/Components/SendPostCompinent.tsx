import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaRegEye } from "react-icons/fa";
import { auth } from "../Services/auth-service";
import { dialogs } from "../Constants/AlertsConstant";
import { useNavigate } from "react-router-dom";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";
import { ICategory, INewPost } from "../Models/Interaction";
import { ISocialGroup } from "../Models/SocialGroup";
import { Post } from "routing-controllers";
import { Posts } from "../Services/post-service";
import { useLogin } from "../CustomHooks/useLogin";
import { catchError } from "../Constants/Patterns";

function SendPostCompinent() {
  const [isLoading, setIsLoading] = useState(false);
  const loggedInContext = useLogin();

  const navigate = useNavigate();

  const validationScheme = Yup.object({
    title: Yup.string().required("A title is required").min(2).max(55),
    link: Yup.string().url(),
    text: Yup.string().min(2).required("Must have some text"),
    //  Category: Yup.string()
    //    .required("Please select an option")
    //    .notOneOf([""], "Please select a valid option"),
  });

  const category: ICategory = {
    id: 0,
    name: "",
  };

  const NewPost: INewPost = {
    id: "",
    title: "",
    link: "",
    imageURL: "https://i.imgur.com/ozEaj1Z.png",
    text: "",
    authorId: "",
    category: category,
    group: "",
    keyWords: "",
    datetime: "",
  };

  return (
    <>
      <Formik
        initialValues={NewPost}
        validationSchema={validationScheme}
        onSubmit={(o) => {
          console.log("Form submitted with values: ", o);
          if (loggedInContext.token) {
            setIsLoading(true);
            Posts.postPost(loggedInContext.token, o as INewPost)
              .then((response) => {
                console.log(response);
                dialogs.success("Sending Post Succefull");
              })
              .then(() => {
                navigate("Feed");
              })
              .catch((error) => {
                catchError(error, "Sending Post");
              });
          }
        }}
      >
        <Form className="mt-5">
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
            <label className="text-4xl font-bold text-gray-800 mb-2  text-center">
              New Post
            </label>
            <Field
              className="rounded-md hover:border-2 border-2 px-2 py-2"
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              required
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
            <Field
              className="rounded-md hover:border-2 border-2 px-2 py-2"
              id="text"
              name="text"
              type="text"
              placeholder="Text"
              required
            />
            <ErrorMessage
              name="text"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
            <Field
              className="rounded-md hover:border-2 border-2 px-2 py-2"
              id="link"
              name="link"
              type="text"
              placeholder="Link"
            />

            <ErrorMessage
              name="link"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
            <Field
              className="rounded-md hover:border-2 border-2 px-2 py-2"
              id="keyWords"
              name="keyWords"
              type="text"
              placeholder="Key Words"
            />

            <ErrorMessage
              name="keyWords"
              component="div"
              className="text-red-500"
            />
          </div>
          {isLoading && (
            <>
              <div className=" flex flex-col items-center">
                <ClimbBoxSpinner /> <br />
              </div>
            </>
          )}
          <div className="font-extralight rounded-md border-2 form-group flex flex-col gap-2 w-1/2 mx-auto text-lg mt-5">
            <button
              disabled={isLoading}
              type="submit"
              onClick={() => {
                console.log("Form values before submission: ");
              }}
              className="text-red-300 bg-green-700 font-bold p-3"
            >
              Post
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default SendPostCompinent;
