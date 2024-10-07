import { Modal } from "react-bootstrap";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { dialogs } from "../Constants/AlertsConstant";
import { useNavigate } from "react-router-dom";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";
import { Posts } from "../Services/post-service";
import { useLogin } from "../CustomHooks/useLogin";
import { catchError, colors } from "../Constants/Patterns";
import { HiLink } from "react-icons/hi2";
import ImageUpload from "../Constants/ImageUploading";
import { usePosts } from "../CustomHooks/usePosts";
import ElementFrame from "../Constants/Objects/ElementFrame";
import { INewComment } from "../Models/CommentModels";

interface AddCommentCommentModalProps {
  commentId: string;
  Mshow: boolean;
  onHide: () => void;
}

const AddCommentCommentModal: React.FC<AddCommentCommentModalProps> = ({
  commentId,
  Mshow,
  onHide,
}) => {
  const [show, setShow] = useState(Mshow);
  const [isLoading, setIsLoading] = useState(false);
  const loggedInContext = useLogin();
  const [Url, setUrl] = useState("");
  const postsContext = usePosts();
  const navigate = useNavigate();

  const handleclose = () => {
    setShow(false);
    onHide();
  };

  const toggelShow = () => {
    setShow((prevshow) => !prevshow);
  };

  const validationScheme = Yup.object({
    link: Yup.string().url(),
    text: Yup.string().min(2).required("Must have some text"),
  });

  const handelAddUrl = async () => {
    const getUrl = await dialogs.getText("Link");
    setUrl(getUrl);
  };

  const NewComment: INewComment = {
    id: "",
    link: "",
    imageURL: "",
    text: "",
    authorId: "",
    ParentPostId: "",
    ParentCommentId: commentId,
    Datetime: "",
  };
  const [postValues, setpostValues] = useState<INewComment>(NewComment);

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
        const response = await Posts.postPost(values);
        console.log(response);
        dialogs.success("Sending Post Successful");
        navigate("/Feed");
        toggelShow();
      } catch (error) {
        catchError(error, "Sending Post");
      } finally {
        postsContext.clearImage();
        handleclose();
        setIsLoading(false);
      }
    }
  };
  useEffect(() => {
    setShow(Mshow);
  }, [Mshow]);
  return (
    <>
      <Modal show={show} onHide={onHide} className="comment-modal">
        <>
          <ElementFrame height="300px" width="300px" padding="1">
            <>
              <Formik
                initialValues={NewComment}
                validationSchema={validationScheme}
                onSubmit={handleSubmit}
              >
                {({ handleSubmit }) => (
                  <Form className="mt-1" onSubmit={handleSubmit}>
                    <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg mt-1">
                      <div className="flex justify-evenly">
                        <label className="text-2xl font-bold  text-center">
                          Comment
                        </label>
                      </div>
                    </div>
                    <div className="font-extralight form-group flex flex-col gap-2 w-full mx-auto text-lg mt-1 ">
                      <Field
                        className={`rounded-md hover:border-2 border-2 px-2 py-2 ${colors.TextBox} `}
                        id="text"
                        name="text"
                        type="text"
                        placeholder="Text"
                        as="textarea"
                        style={{
                          height: "80px",
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
                    <div className="font-semibold ml-3 flex justify-evenly items-center w-full mx-auto text-lg -m-2">
                    <button
                        
                        type="button"
                        className="pl-6 -mt-2"
                        onClick={handelAddUrl}
                      ><div className="flex flex-col items-center">
                        Add Link
                        <div className="p-2"></div>
                        <HiLink style={{ fontSize: "35px" }} /></div>
                      </button>
                      

                    <div className="pl-7 pb-4 pt-3">
                      
                        <ImageUpload />
                      
                    </div>
                    </div>
                    {isLoading && (
                      <>
                        <div className=" flex flex-col items-center">
                          <ClimbBoxSpinner /> <br />
                        </div>
                      </>
                    )}
                    <div className="font-extralight rounded-md border-2 form-group flex flex-col gap-2 w-full mx-auto text-lg -m-3">
                      <button
                        disabled={isLoading}
                        type="submit"
                        className={` font-bold ${colors.Buttons}`}
                      >
                        Submit
                      </button>
                      <button
                        disabled={isLoading}
                        type="button"
                        onClick={handleclose}
                        className={` font-bold ${colors.Buttons}`}
                      >
                        Close
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </>
          </ElementFrame>
        </>
      </Modal>
    </>
  );
};

export default AddCommentCommentModal;
