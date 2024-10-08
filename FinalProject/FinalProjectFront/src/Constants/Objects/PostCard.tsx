import React, { useEffect, useState } from "react";
import { HiLink } from "react-icons/hi2";

import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import ElementFrame from "./ElementFrame";
import { dialogs } from "../AlertsConstant";
import { TiDelete } from "react-icons/ti";

import { useUser } from "../../CustomHooks/useUser";
import { CommentService } from "../../Services/comment-service";
import { useLogin } from "../../CustomHooks/useLogin";

import { IPostDisplay } from "../../Models/Interaction";
import { CommentList } from "../../Components/CommentList";
import AddPostCommentModal from "../../Modals/AddPostCommentModal";
import { FaCommentMedical } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";
import { colors } from "../Patterns";
import PostView from "./PostView";

const PostCard: React.FC<IPostDisplay> = (postDisplay) => {
  const [card, setCard] = useState(true);


  const userContext = useUser();
  const handelImage = () => {
    dialogs.showImage("", postDisplay.imageUrl);
  };

  const toggleCard = () => {
    setCard((prevCrad) => !prevCrad )
  }

  return (
    <>
    
    <button className=" flex justify-center pl-2 -mb-10 " onClick={toggleCard}>
    <BsArrowsFullscreen size={25} className={`z-50 ${colors.ButtonFont}`} />
    </button>
    {card ? (
      <ElementFrame height={`${postDisplay.imageUrl ? ("230px") : ("90px")}`} width="400px" padding="2 mt-2">
        <div>
          <div className="flex">
            <button className=" text-sm font-bold pl-10">
              {postDisplay.authorName}
              </button>
            {postDisplay.authorId == userContext.userInfo.UserId && (
              <button className="ml-auto mb-2">
                <TiDelete />
              </button>
            )}
          </div>
          <div
            className=" font-bold flex justify-evenly"
            style={{
              height: "25px",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            <button>
            {postDisplay.title}</button>
          </div>
          <div className="p-0.5" />
          {postDisplay.imageUrl && (
            <button
              className="pl-3 flex justify-center items-center"
              onClick={handelImage}
            >
              <img
                src={postDisplay.imageUrl}
                style={{
                  maxHeight: "40%",
                  maxWidth: "40%",
                  objectFit: "contain",
                }}
              />
            </button>
          )}
          
        </div>
        <div className="flex justify-between items-center">

<div className={` font-bold ${colors.InteractionText} ml-16 -mt-2` }/>

        <div className="flex justify-end">
        {postDisplay.datetime}</div>
        </div>
      </ElementFrame>
    ):( 
    <>
    
    <PostView {...postDisplay} /><div className="pb-9"/></>)}

    </>
  );
};

export default PostCard;
