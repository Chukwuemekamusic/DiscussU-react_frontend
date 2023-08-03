import { Dropdown } from "react-bootstrap";
import PeopleIcon from "@mui/icons-material/People";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { useHomeStore } from "../store";
// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import { Card, Button, Row, Col, Badge, Image } from "react-bootstrap";
// import CommentOptionsMenu from "./CommentOptionsMenu";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getHeaders } from "../api/getHeaders";
import axios from "axios";
import BASE_URL from "../api/apiConfig";
import Cookies from "js-cookie";
import useErrorCheck from "./utils/useErrorCheck";

const FollowUnfollow = ({ userId }) => {
  const updateFollowData = useHomeStore((state) => state.updateFollowData);
  const updateUserData = useHomeStore((state) => state.updateUserData);
  const getStudentsProfile = useHomeStore((state) => state.getStudentsProfile);
  const [isLoadFollow, setIsLoadFollow] = useState(false);
  const token = Cookies.get("token");
  const errorCheck = useErrorCheck();
  const user = JSON.parse(localStorage.getItem("user"));
  const isFollowedUser = useHomeStore((state) => state.isFollowedUser);

  useEffect(() => {
    updateFollowData();
    getStudentsProfile();
    updateUserData();
  }, [isLoadFollow]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFollow = async (commentUserId) => {
    // console.log("commentUser", commentUserId);
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
      console.error("Follow Failed", error);
    }

    setIsLoadFollow(!isLoadFollow);
  };

  return (
    <>
      {!isFollowedUser(userId) ? (
        <Dropdown.Item onClick={() => handleFollow(userId)}>
          {/* {console.log("commentUserformer", isFollowedUser(userId))} */}
          <PeopleIcon className="sidebar-icon" /> Follow
        </Dropdown.Item>
      ) : (
        <Dropdown.Item onClick={() => handleUnfollow(userId)}>
          <NoAccountsIcon className="sidebar-icon" /> Unfollow
        </Dropdown.Item>
      )}
    </>
  );
};

export default FollowUnfollow;
