import { Modal } from "react-bootstrap";

import React, { CSSProperties, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { dialogs } from "../Constants/AlertsConstant";
import { useNavigate } from "react-router-dom";
import ClimbBoxSpinner from "../Spinners/ClimbBoxSpinner";
import { Posts } from "../Services/post-service";
import { useLogin } from "../CustomHooks/useLogin";
import { catchError, colors, imageFieldValues, linkFieldValues } from "../Constants/Patterns";

import ImageUpload from "../Constants/ImageUploading";
import { usePosts } from "../CustomHooks/usePosts";
import ElementFrame from "../Constants/Objects/ElementFrame";
import { INewComment } from "../Models/CommentModels";
import { FormikElementBuilder, MYFormikValues } from "../Constants/FormikElementBuilder";
import { CommentService } from "../Services/comment-service";

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
   const postsContext = usePosts(); 
   const navigate = useNavigate();  
  const linkValues = linkFieldValues
  const imageValues = imageFieldValues

  imageValues.value = postsContext.imageURL;


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


  
  const [commentValues, setCommentValues] = useState<INewComment>(NewComment);

  const handleSubmit = async (values) => {
    setCommentValues(values);
    if (postsContext.selectedFile != null) {
      await postsContext.handleUpload();
      setIsLoading(true);
    } else {
      await postComment(values);
    }
  };
  
  useEffect(() => {
    const submitComment = async () => {
      if (postsContext.imageURL && commentValues.text?.length && commentValues.text?.length>2) {
        await postComment(commentValues);
      }
    };
    submitComment();
  }, [postsContext.imageURL]);

  const postComment = async (values) => {
    if (loggedInContext.token) {
      console.log("Form submitted with values: ", values);
      setIsLoading(true);
      try {
        values.imageURL = postsContext.imageURL;
        postsContext.clearImage();
        const response = await CommentService.PostComment(values);
        console.log(response);
        dialogs.success("Comment Sent");
        toggelShow();
      } catch (error) {
        catchError(error, "Commenting");
      } finally {
        setCommentValues(NewComment)
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
          <ElementFrame height="390px" width="300px" padding="1">
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
                    
                    <FormikElementBuilder {...linkValues}/>
                    <FormikElementBuilder {...imageValues}/>
                    <div className="font-semibold  flex justify-evenly items-center w-full mx-auto text-lg -mt-6">


                    <div className="pb-4 pt-3">
                      
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
