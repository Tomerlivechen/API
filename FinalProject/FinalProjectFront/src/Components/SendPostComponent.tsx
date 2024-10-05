import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { dialogs } from "../Constants/AlertsConstant";
import { useNavigate } from "react-router-dom";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";
import { ICategory, INewPost } from "../Models/Interaction";
import { Posts } from "../Services/post-service";
import { useLogin } from "../CustomHooks/useLogin";
import { catchError } from "../Constants/Patterns";
import { HiLink } from "react-icons/hi2";
import ImageUpload from "../Constants/ImageUploading";
import { usePosts } from "../CustomHooks/usePosts";
import ElementFrame from "../Constants/Objects/ElementFrame";

function SendPostComponent() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInContext = useLogin();
  const [Url, setUrl] = useState("");
  const postsContext = usePosts();
  const navigate = useNavigate();

  const toggelOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const validationScheme = Yup.object({
    title: Yup.string().required("A title is required").min(2).max(55),
    link: Yup.string().url(),
    text: Yup.string().min(2).required("Must have some text"),
  });

  const handelAddUrl = async () => {
    const getUrl = await dialogs.getText("Link");
    setUrl(getUrl);
  };

  const category: ICategory = {
    id: 0,
    name: "",
  };

  const NewPost: INewPost = {
    id: "",
    title: "",
    link: "",
    imageURL: "",
    text: "",
    authorId: "",
    category: category,
    group: "",
    keyWords: "",
    datetime: "",
  };
  const [postValues, setpostValues] = useState<INewPost>(NewPost);

  const handleSubmit = async (values) => {
    setpostValues(values);
    if (postsContext.selectedFile != null) {
      await postsContext.handleUpload();
      setIsLoading(true);
    } else {
      await postPost(values);
    }
  };

  useEffect(() => {
    const submitPost = async () => {
      if (postsContext.imageURL) {
        await postPost(postValues);
      }
    };
    submitPost();
  }, [postsContext.imageURL]);

  const postPost = async (values) => {
    if (loggedInContext.token) {
      console.log("Form submitted with values: ", values);
      setIsLoading(true);
      try {
        values.link = Url;
        values.imageURL = postsContext.imageURL;
        const response = await Posts.postPost(loggedInContext.token, values);
        console.log(response);
        dialogs.success("Sending Post Successful");
        navigate("/Feed");
        toggelOpen();
      } catch (error) {
        catchError(error, "Sending Post");
      } finally {
        postsContext.clearImage();
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {open ? (
        <>
          <ElementFrame height="490px" width="400px" padding="1">
            <Formik
              initialValues={NewPost}
              validationSchema={validationScheme}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit }) => (
                <Form className="mt-1" onSubmit={handleSubmit}>
                  <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg mt-1">
                    <div className="flex justify-evenly">
                      <label className="text-4xl font-bold  text-center">
                        New Post
                      </label>
                      <button
                        className="rounded-md dark:bg-emerald-800 m-1 p-1 bg-emerald-300"
                        onClick={toggelOpen}
                      >
                        {open ? "Close" : "Write"}
                      </button>
                    </div>
                    <Field
                      className="rounded-md hover:border-2 border-2 px-2 py-2  dark:bg-teal-900 bg-emerald-300"
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
                  <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg mt-1">
                    <Field
                      className="rounded-md hover:border-2 border-2 px-2 py-2  dark:bg-teal-900 bg-emerald-300"
                      id="text"
                      name="text"
                      type="text"
                      placeholder="Text"
                      as="textarea"
                      style={{
                        height: "150px",
                        overflowY: "auto",
                        whiteSpace: "pre-wrap",
                        resize: "none",
                      }}
                      required
                    />
                    <ErrorMessage
                      name="text"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg mt-1">
                    <Field
                      className="rounded-md hover:border-2 border-2 px-2 py-2  dark:bg-teal-900 bg-emerald-300"
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

                  <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg">
                    <Field
                      className="rounded-md hover:border-2 border-2 px-2 py-2"
                      id="link"
                      name="link"
                      type="hidden"
                      value={Url}
                      placeholder="Link"
                    />

                    <ErrorMessage
                      name="link"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg">
                    <Field
                      className="rounded-md hover:border-2 border-2 px-2 py-2"
                      id="imageURL"
                      name="imageURL"
                      type="hidden"
                      value={postsContext.imageURL}
                      placeholder="imageURL"
                    />

                    <ErrorMessage
                      name="imageURL"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="font-semibold flex justify-evenly items-center w-full mx-auto text-lg ">
                    <ElementFrame height="100px" width="100px" padding="1">
                      Add Link
                      <button
                        type="button"
                        className="pl-6 pt-3"
                        onClick={handelAddUrl}
                      >
                        <HiLink style={{ fontSize: "35px" }} />
                      </button>
                    </ElementFrame>
                    <div className="pl-10">
                      <ElementFrame height="100px" width="130px" padding="1">
                        <ImageUpload />
                      </ElementFrame>
                    </div>
                  </div>
                  {isLoading && (
                    <>
                      <div className=" flex flex-col items-center">
                        <ClimbBoxSpinner /> <br />
                      </div>
                    </>
                  )}
                  <div className="font-extralight rounded-md border-2 form-group flex flex-col gap-2 w-full mx-auto text-lg ">
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="text-red-300 bg-green-700 font-bold p-1"
                    >
                      Post
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </ElementFrame>
        </>
      ) : (
        <>
          <ElementFrame height="55px" width="300px" padding="1">
            <div className="flex justify-evenly">
              <label className="text-4xl font-bold  mb-1 ">New Post</label>
              <button
                className="rounded-md dark:bg-emerald-800 m-1 p-1 bg-emerald-300"
                onClick={toggelOpen}
              >
                {open ? "Close" : "Write"}
              </button>
            </div>
          </ElementFrame>
        </>
      )}
    </>
  );
}

export default SendPostComponent;
