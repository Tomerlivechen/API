import React, {  useState } from "react";
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
import { FaKey } from "react-icons/fa";
import EditPostModal from "../../Modals/EditPostModal";
import { MdEdit } from "react-icons/md";
import { Posts } from "../../Services/post-service";

const PostView: React.FC<IPostDisplay> = (postDisplay) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleShow = () => setShowModal((prevshowModal) => !prevshowModal);


  const handleClose = () => setShowModal(false);
  const userContext = useUser();
  const loginContex = useLogin();
  const CommentAPI = CommentService;
  const handelImage = () => {
    dialogs.showImage("", postDisplay.imageURL);
  };
  const handleShowEdit = () => setShowEditModal((prevshowEditModal) => !prevshowEditModal);
  const handleVote = async (vote: number) => {
    if (loginContex.token) {
      await CommentAPI.VoteOnComment(postDisplay.id, vote);
      postDisplay.hasVoted = true;
      postDisplay.totalVotes += vote;
    }
  };
  const handleDelete = () => Posts.DeletePost(postDisplay.id);
  return (
    <>
      <ElementFrame height={`${postDisplay.imageURL ? ("450px") : ("230px")}`} width="400px" padding="2 mt-2">
        <div>
          <div className="flex justify-between items-center">
            <button className=" text-sm font-bold pl-10">
              {postDisplay.authorName}
            </button>
            {((postDisplay.authorId == userContext.userInfo.UserId) || userContext.userInfo.IsAdmin) && (<>
            <div className="flex">
              <div className="flex space-x-2">
                    <button className="ml-auto mb-2" onClick={handleShowEdit}>
                          <MdEdit size={22} />
                        </button>
                        <EditPostModal
                                        Mshow={showEditModal}
                                        onHide={handleShowEdit}
                                        post={postDisplay}
                        />
              <button className="ml-auto mb-2">
                <TiDelete size={22} onClick={handleDelete} />
              </button>
                      </div></div></>
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
          
          <div className="relative  " />
          <div className="flex justify-evenly ">
          {postDisplay.imageURL && (
            <button
              className=""
              onClick={handelImage}
            >
              <img className="h-56 "
                src={postDisplay.imageURL}

              />
            </button>
          )}
          </div>
          
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
              {postDisplay.keyWords.length>0 && (
                <button
                  className="pl-3"
                  onClick={() => dialogs.showtext(postDisplay.keyWords.toString())}
                >
                  <FaKey  size={22} />
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
      
              <div className="-mt-8 relative z-10 " >
      <CommentList index={0} commmentList={postDisplay.comments} /></div>

    </>
  );
};

export default PostView;
