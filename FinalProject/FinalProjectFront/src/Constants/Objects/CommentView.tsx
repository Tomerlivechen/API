import React, { useState } from "react";
import { ICommentDisplay } from "../../Models/Interaction";
import { HiLink } from "react-icons/hi2";
import { IoImage } from "react-icons/io5";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import ElementFrame from "./ElementFrame";
import { dialogs } from "../AlertsConstant";
import { TiDelete } from "react-icons/ti";

import { useUser } from "../../CustomHooks/useUser";
import { CommentService } from "../../Services/comment-service";
import { useLogin } from "../../CustomHooks/useLogin";

import { CommentList } from "../../Components/CommentList";
import AddCommentCommentModal from "../../Modals/AddCommentCommentModal";

const CommentView: React.FC<ICommentDisplay> = (commentDisplay) => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal((prevshowModal) => !prevshowModal);
  const handleClose = () => setShowModal(false);
  const userContext = useUser();
  const loginContex = useLogin();
  const CommentAPI = CommentService;
  const handelImage = () => {
    dialogs.showImage("", commentDisplay.imageUrl);
  };

  const handleVote = async (vote: number) => {
    if (loginContex.token) {
      await CommentAPI.VoteOnComment(
        loginContex.token,
        commentDisplay.id,
        vote
      );
      commentDisplay.hasVoted = true;
      commentDisplay.totalVotes += vote;
    }
  };

  return (
    <>
      <ElementFrame
        height="150px"
        width="400px"
        padding="2"
        position="relative"
      >
        <div>
          <div className="flex">
            <button className=" text-sm font-bold">
              {commentDisplay.authorName}
            </button>
            {commentDisplay.authorId == userContext.userInfo.UserId && (
              <button className="ml-auto mb-2">
                <TiDelete />
              </button>
            )}
          </div>
          <div
            className="bg-teal-200 dark:bg-teal-900"
            style={{
              height: "80px",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {commentDisplay.text}
          </div>
          <div className="flex pt-2 justify-between w-full">
            <div className="flex items-center">
              {commentDisplay.link && (
                <button
                  className="pl-3"
                  onClick={() => window.open(commentDisplay.link, "_blank")}
                >
                  <HiLink size={20} />
                </button>
              )}
              {commentDisplay.imageUrl && (
                <button className="pl-3" onClick={handelImage}>
                  <IoImage size={20} />
                </button>
              )}
            </div>
            <div className="flex items-center pl-4">
              <button
                className="rounded-md dark:bg-emerald-800 m-1 p-1 bg-emerald-300"
                onClick={handleShow}
              >
                Reply
              </button>
              <AddCommentCommentModal
                Mshow={showModal}
                onHide={handleClose}
                commentId={commentDisplay.id}
              />
            </div>
            <div className="flex items-center">
              {!commentDisplay.hasVoted && (
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
                  {commentDisplay.totalVotes}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ElementFrame>

      <span
        className="-mt-16 "
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <CommentList index={0} commmentList={commentDisplay.comments} />
      </span>
    </>
  );
};

export default CommentView;
