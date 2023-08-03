import { Dropdown } from "react-bootstrap";
import PeopleIcon from "@mui/icons-material/People";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
// import FlagTwoToneIcon from "@mui/icons-material/FlagTwoTone";
import { useHomeStore } from "../store";
import FlagComment from "./FlagComment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Chat from "../pages/Chat";
// import { useState } from "react";
// import FollowUnfollow from "./FollowUnfollow";

const CommentOptionsMenu = ({ comment, onFollow, onUnfollow, setOpenMenu }) => {
  const isFollowedUser = useHomeStore((state) => state.isFollowedUser);
  const student = useHomeStore((state) => state.getStudentById(comment.user))


  return (
    // <DropdownButton title="Options">
    <div className="comment-options-menu">
      <ArrowBackIcon
            className="sidebar-img hover-blue"
            onClick={() => setOpenMenu(false)}
          />{" "}
          <br />
      {/* Follow option className="sidebar-items" */}
      {!isFollowedUser(comment.user) ? (
        <Dropdown.Item onClick={() => onFollow(comment.user)} className="hover-blue">
          {console.log("commentUserformer", isFollowedUser(comment.user))}
          <PeopleIcon className="sidebar-icon " /> Follow
        </Dropdown.Item>
      ) : (
        <Dropdown.Item onClick={() => onUnfollow(comment.user)} className="hover-blue">
          <NoAccountsIcon className="sidebar-icon" /> Unfollow
        </Dropdown.Item>
      )}
      
      <FlagComment comment={comment}/>
      <Chat user={student}/>
      
    </div>
  );
};

export default CommentOptionsMenu;
