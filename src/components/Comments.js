import DeleteComment from "./DeleteComment";
import ReplyComment from "./ReplyComment";
// import AuthContext from "../context/AuthProvider";
// import { useContext, useRef } from "react";
import ReplyIcon from "@mui/icons-material/Reply";
import moment from "moment";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Row, Image } from "react-bootstrap";
import CommentOptionsMenu from "./CommentOptionsMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getHeaders } from "../api/getHeaders";
import axios from "axios";
import Cookies from "js-cookie";
import useErrorCheck from "./utils/useErrorCheck";
import { useHomeStore } from "../store";
import BASE_URL from "../api/apiConfig";

const Comments = ({
  room_id,
  roomComment,
  handleCommentUpdated,
  handleReply,
  addCommentRef,
  replyParentComment,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [highlightedComment, setHighlightedComment] = useState(null);
  const token = Cookies.get("token");
  const errorCheck = useErrorCheck();
  // const isFollowedUser = useHomeStore((state) => state.isFollowedUser);
  const updateFollowData = useHomeStore((state) => state.updateFollowData);
  const updateUserData = useHomeStore((state) => state.updateUserData);
  const getStudentsProfile = useHomeStore((state) => state.getStudentsProfile)
  const [isLoadFollow, setIsLoadFollow] = useState(false);

  useEffect(() => {
    if (highlightedComment) {
      setTimeout(() => {
        setHighlightedComment(null);
      }, 4000);
    }
  }, [highlightedComment]);

  useEffect(() => {
    updateFollowData();
    getStudentsProfile();
    updateUserData();

  }, [isLoadFollow]);

  const [showOptionsMenuFor, setShowOptionsMenuFor] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleOptionsMenuClick = (commentId) => {
    setShowOptionsMenuFor(commentId);
    setOpenMenu(!openMenu);
  };

  const handleFollow = async (commentUserId) => {
    console.log("commentUser", commentUserId);
    // console.log("user", user.id);
    try {
      await axios.post(
        BASE_URL + "users/follow/",
        { followed_user: commentUserId, follower: user.id },
        getHeaders(token)
      );
      // console.log("Follow Successful");
    } catch (error) {
      errorCheck(error);
    }
    setOpenMenu(false);
    setIsLoadFollow(!isLoadFollow);
  };

  const handleUnfollow = async (commentUserId) => {
    try {
      await axios.delete(
        BASE_URL + `users/unfollow/${commentUserId}/`,
        // { followed_user: commentUserId, follower: user.id },
        getHeaders(token)
      );
      // console.log("Follow Successful");
    } catch (error) {
      // console.error("Follow Failed", error);
    }
    setOpenMenu(false);
    setIsLoadFollow(!isLoadFollow);
  };

  const handleReport = () => {};

  return (
    <>
      {roomComment.map((comment) => {
        const timeSince = moment(comment.created).fromNow();
        const parentComment = comment.parent_comment
          ? comment.parent_comment_details
          : null;

        const isUserComment = user && user.id === comment.user;
        // console.log("isuser", isUserComment);

        return (
          <Row
            className={`${
              isUserComment ? "user-comment ml-auto" : "other-comment"
            }`}
            key={comment.id}
          >
            <Card
              id={`comment-${comment.id}`}
              key={comment.id}
              className={`mb-4 ${
                highlightedComment === comment.id ? "highlighted-comment" : ""
              } `}
              style={{ width: "700px" }}
            >
              <Card.Body>
                {/* className="card-header" id="commentUserHeader" */}
                <div className="d-flex align-items-center ">
                  <Image
                    src={comment.user_profile_pic}
                    roundedCircle
                    className="profile-pic mr-3"
                  />
                  <div>
                    <h6 className="mb-0">{comment.user_full_name}</h6>
                    {/* {console.log(comment.user)} */}
                    <Link to={`/student/${comment.user}/profile`}>
                      <small className="host-name">@{comment.username}</small>
                    </Link>
                    <small className="text-muted m-2 ">{timeSince}</small>
                  </div>

                  <MoreVertIcon
                    onClick={() => handleOptionsMenuClick(comment.id)}
                  />

                  {/* Show options menu if the button is clicked */}
                  {openMenu && showOptionsMenuFor === comment.id && (
                    <CommentOptionsMenu
                      comment={comment}
                      onFollow={handleFollow}
                      onUnfollow={handleUnfollow}
                      onReport={handleReport}
                      setOpenMenu={setOpenMenu}
                    />
                  )}
                </div>

                <hr />
                {parentComment && (
                  <ScrollLink
                    to={`comment-${parentComment.id}`}
                    spy={true}
                    smooth={true}
                    offset={-200}
                    duration={500}
                    onClick={() => setHighlightedComment(parentComment.id)}
                  >
                    <div className="thumbnail mt-2 reply-thumbnail cursor-pointer">
                      <span className="mb-0">
                        <i>replying</i> @{parentComment.user}{" "}
                        {parentComment.content}
                      </span>
                      <span className="reply-icon">
                        <ReplyIcon />
                      </span>
                    </div>
                  </ScrollLink>
                )}
                <p>{comment.content}</p>

                <div className="d-flex justify-content-between mt-3">
                  <ReplyComment
                    room_id={room_id}
                    comment={comment}
                    handleReply={handleReply}
                    addCommentRef={addCommentRef}
                    replyParentComment={replyParentComment}
                  />
                  {user.id === comment.user && (
                    <DeleteComment
                      room_id={room_id}
                      comment={comment}
                      handleCommentUpdated={handleCommentUpdated}
                    />
                  )}
                </div>
              </Card.Body>
              {/* <Card.Footer></Card.Footer> */}
            </Card>
          </Row>
        );
      })}
    </>
  );
};

export default Comments;

// return (
//   <div>
//     {roomComment.map((comment, index) => {
//       const timeSince = moment(comment.created).fromNow();
//       const parentComment = comment.parent_comment
//         ? comment.parent_comment_details
//         : null;

//       // console.log('this is parent comment', parentComment);
//       return (
//         <div
//           id={`comment-${comment.id}`}
//           key={comment.id}
//           className={`card mb-3 ${
//             highlightedComment === comment.id ? "highlighted-comment" : ""
//           }`}
//         >

//           <div className="card-header" id="commentUserHeader">
//             <span>
//               <b>{comment.user_full_name}</b>{" "}
//               <small>
//                 @{comment.user} <i>{timeSince}</i>
//               </small>
//             </span>
//           </div>
//           {parentComment && (
//             <Link
//               to={`comment-${parentComment.id}`}
//               spy={true}
//               smooth={true}
//               offset={0}
//               duration={500}
//               onClick={() => setHighlightedComment(parentComment.id)}
//             >
//               <div className="thumbnail mt-2 reply-thumbnail">
//                 <span className="reply-icon">
//                   <ReplyIcon />
//                 </span>
//                 <span className="mb-0">
//                   {" "}
//                   replying @{parentComment.user} {parentComment.content}
//                 </span>
//               </div>
//             </Link>
//           )}

//           <div className="card-body" id="commentBody">
//             <p>{comment.content}</p>
//             <ReplyComment
//               room_id={room_id}
//               comment={comment}
//               handleReply={handleReply}
//               addCommentRef={addCommentRef}
//               replyParentComment={replyParentComment}
//             />
//             {/* TODO fix to user.id */}
//             {user.username === comment.user && (
//               <DeleteComment
//                 room_id={room_id}
//                 comment={comment}
//                 handleCommentUpdated={handleCommentUpdated}
//               />
//             )}
//           </div>
//         </div>
//       );
//     })}
//   </div>
// );
