// import DeleteMessage from "./DeleteMessage";
// import ReplyComment from "./ReplyComment";
// import AuthContext from "../context/AuthProvider";
// import { useContext, useRef } from "react";
import moment from "moment";
// import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Row } from "react-bootstrap";
// import CommentOptionsMenu from "./CommentOptionsMenu";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { getHeaders } from "../api/getHeaders";
// import axios from "axios";
import Cookies from "js-cookie";
// import useErrorCheck from "../utils/useErrorCheck";
import { useHomeStore } from "../../store";
import DeleteMessage from "./DeleteMessage";

const Messages = ({
  student_id,
  student,
  messages,
  handleMessageUpdated,
  // handleReply,
  // addCommentRef,
  // replyParentComment,
}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [highlightedComment, setHighlightedComment] = useState(null);
  const token = Cookies.get("token");
  // const errorCheck = useErrorCheck();
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
{/* 
  // const [showOptionsMenuFor, setShowOptionsMenuFor] = useState(null);
  // const [openMenu, setOpenMenu] = useState(false);

  // const handleOptionsMenuClick = (commentId) => {
  //   setShowOptionsMenuFor(commentId);
  //   setOpenMenu(!openMenu);
  // };

  // const handleFollow = async (commentUserId) => {
  //   console.log("commentUser", commentUserId);
  //   // console.log("user", user.id);
  //   try {
  //     await axios.post(
  //       "http://localhost:8000/api/users/follow/",
  //       { followed_user: commentUserId, follower: user.id },
  //       getHeaders(token)
  //     );
  //     // console.log("Follow Successful");
  //   } catch (error) {
  //     errorCheck(error);
  //   }
  //   setOpenMenu(false);
  //   setIsLoadFollow(!isLoadFollow);
  // };

  // const handleUnfollow = async (commentUserId) => {
  //   try {
  //     await axios.delete(
  //       `http://localhost:8000/api/users/unfollow/${commentUserId}/`,
  //       // { followed_user: commentUserId, follower: user.id },
  //       getHeaders(token)
  //     );
  //     // console.log("Follow Successful");
  //   } catch (error) {
  //     // console.error("Follow Failed", error);
  //   }
  //   setOpenMenu(false);
  //   setIsLoadFollow(!isLoadFollow);
  // };

  // const handleReport = (commendId) => {};
  */}

  return (
    <>
      {messages.map((message) => {
        const timeSince = moment(message.created).fromNow();
        // const parentmessage = message.parent_message
        //   ? message.parent_message_details
        //   : null;

        const isUserMessage = user && user.id === message.sender;
        // console.log("isuser", isUserComment);

        return (
          <Row
            className={`${
              isUserMessage ? "user-comment ml-auto" : "other-comment"
            }`}
          >
            <Card
              id={`comment-${message.id}`}
              key={message.id}
              className={`mb-4 ${
                highlightedComment === message.id ? "highlighted-comment" : ""
              } `}
              style={{ width: "700px" }}
            >
              <Card.Body>
                {/* className="card-header" id="commentUserHeader" */}
                <div className="d-flex align-items-center ">
                  {/* TODO
                  <Image
                    src={message.sender_profile_pic}  
                    roundedCircle
                    className="profile-pic mr-3"
                  /> */}
                  <div>
                    <h6 className="mb-0">{message.sender_full_name}</h6>
                    {/* {console.log(comment.user)} */}
                    <Link to={`/student/${message.sender}/profile`}>
                      <small className="host-name">@{message.sender_name}</small>
                    </Link>
                    <small className="text-muted m-2 ">{timeSince}</small>
                  </div>

                  {/* <MoreVertIcon
                    onClick={() => handleOptionsMenuClick(message.id)}
                  /> */}

                  {/* Show options menu if the button is clicked */}
                  {/* {openMenu && showOptionsMenuFor === message.id && (
                    <CommentOptionsMenu
                      comment={comment}
                      onFollow={handleFollow}
                      onUnfollow={handleUnfollow}
                      onReport={handleReport}
                      setOpenMenu={setOpenMenu}
                    />
                  )} */}
                </div>

                <hr />
                {/* {parentComment && (
                  <ScrollLink
                    to={`comment-${parentMessage.id}`}
                    spy={true}
                    smooth={true}
                    offset={-200}
                    duration={500}
                    onClick={() => setHighlightedComment(parentMessage.id)}
                  >
                    <div className="thumbnail mt-2 reply-thumbnail cursor-pointer">
                      <span className="mb-0">
                        <i>replying</i> @{parentMessage.user}{" "}
                        {parentMessage.content}
                      </span>
                      <span className="reply-icon">
                        <ReplyIcon />
                      </span>
                    </div>
                  </ScrollLink>
                )} */}
                <p>{message.content}</p>

                <div className="d-flex justify-content-between mt-3">
                  {/* <ReplyComment
                    room_id={room_id}
                    comment={comment}
                    handleReply={handleReply}
                    addCommentRef={addCommentRef}
                    replyParentComment={replyParentComment}
                  />*/}
                  {user.id === message.sender && (
                    <DeleteMessage
                      studentId={student_id}
                      message={message}
                      handleMessageUpdated={handleMessageUpdated}
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

export default Messages;
