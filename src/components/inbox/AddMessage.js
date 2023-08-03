import { useState } from "react";
import axios from "axios";
import BASE_URL from "../../api/apiConfig";
import { getHeaders } from "../../api/getHeaders";
import Cookies from "js-cookie";
import useErrorCheck from "../utils/useErrorCheck";
import { Card } from "react-bootstrap";
// import AuthContext from "../context/AuthProvider";

const AddMessage = ({
  student,
  studentId,
  handleMessageUpdated,
  addCommentRef,
  //   replyParentComment,
  //   setReplyParentComment,
}) => {
  //   const parentComment = replyParentComment ? replyParentComment : null;
  //   const parentTag = parentComment ? parentComment.username : null;
  const user = JSON.parse(localStorage.getItem("user"));

  const [newComment, setNewComment] = useState("");
  const token = Cookies.get("token");
  const errorCheck = useErrorCheck();

  const handleMessageSubmit = async (e) => {
    // console.log(newComment);
    // console.log(parentComment.id);
    e.preventDefault();
    // const id = parentComment ? parentComment.id : null;

    try {
      await axios.post(
        BASE_URL + `inbox/`,
        { sender: user.id, receiver: student.id, content: newComment },
        getHeaders(token)
      );

      // Reset input field
      setNewComment("");
      //   setReplyParentComment({});

      // console.log(response.data);
      // console.log(room_id);
      handleMessageUpdated();
    } catch (error) {
      errorCheck(error);
    }
  };
  return (
    <Card.Footer className=" p-2 sticky-add-comment">
      <form onSubmit={handleMessageSubmit}>
        <label htmlFor="content" className="form-label">
          Add a comment
        </label>
        <input
          type="text"
          name="content"
          placeholder="Add a comment..."
          // value={parentTag && `@${parentTag} ` + newComment}
          //   value={`${parentTag ? `@${parentTag} ` : ""}${newComment}`}
          value={newComment}
        //   onChange={(e) =>
        //     setNewComment(
        //       e.target.value.substring(parentTag ? `@${parentTag} `.length : 0)
        //     )
        //   }
        onChange={(e) => setNewComment(e.target.value)}
          ref={addCommentRef}
        />
        <input type="submit" value="Submit" />
      </form>
    </Card.Footer>
  );
};

export default AddMessage;
