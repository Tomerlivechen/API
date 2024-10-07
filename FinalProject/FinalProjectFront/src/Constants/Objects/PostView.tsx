import React, { useState } from "react";
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
import { colors } from "../Patterns";

const PostView: React.FC<IPostDisplay> = (postDisplay) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal((prevshowModal) => !prevshowModal);
  const handleClose = () => setShowModal(false);
  const userContext = useUser();
  const loginContex = useLogin();
  const CommentAPI = CommentService;
  const handelImage = () => {
    dialogs.showImage("", postDisplay.imageUrl);
  };

  const handleVote = async (vote: number) => {
    if (loginContex.token) {
      await CommentAPI.VoteOnComment(postDisplay.id, vote);
      postDisplay.hasVoted = true;
      postDisplay.totalVotes += vote;
    }
  };

  return (
    <>
      <ElementFrame height="450px" width="400px" padding="2 mt-2">
        <div>
          <div className="flex">
            <button className=" text-sm font-bold">
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
            {postDisplay.title}
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
                  maxHeight: "70%",
                  maxWidth: "70%",
                  objectFit: "contain",
                }}
              />
            </button>
          )}
          <div className="p-0.5" />
          <div
            className={`${colors.TextBox}`}
            style={{
              height: "80px",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {postDisplay.text}
          </div>
          <div
            className="flex pt-2 justify-between w-full"
            style={{ position: "sticky" }}
          >
            <div className="flex items-center">
              {postDisplay.link && (
                <button
                  className="pl-3"
                  onClick={() => window.open(postDisplay.link, "_blank")}
                >
                  <HiLink size={22} />
                </button>
              )}

            
            <div className="flex items-center pl-3">
              <button
                className={`{rounded-md m-1 p-1 }`}
                onClick={handleShow}
              >
                <FaCommentMedical size={21} aria-description="add comment" />
              </button>

              <AddPostCommentModal
                Mshow={showModal}
                onHide={handleClose}
                postId={postDisplay.id}
              />
            </div>
            </div>
            <div className="flex items-center">
              {!postDisplay.hasVoted && (
                <>
                  <button
                    onClick={() => {
                      handleVote(1);
                    }}
                  >
                    <BiSolidUpvote size={20} />
                  </button>
                  <button
                    onClick={() => {
                      handleVote(-1);
                    }}
                  >
                    <BiSolidDownvote size={20} />
                  </button>
                </>
              )}
              <div className="flex justify-evenly">
                <div className="pl-4 pr-3 font-bold">
                  {postDisplay.totalVotes}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">

<div className={` font-bold ${colors.InteractionText} ml-16 -mt-2` }>
{postDisplay.comments && postDisplay.comments.length>0  && postDisplay.comments.length}
</div>
        <div className="flex justify-end">
        {postDisplay.datetime}</div>
        </div>
      </ElementFrame>
              <div className="-mt-10" style={{position: "relative",zIndex: 100}}>
      <CommentList index={0} commmentList={postDisplay.comments} />
</div>
    </>
  );
};

export default PostView;
