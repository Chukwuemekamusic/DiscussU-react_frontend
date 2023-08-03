import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../api/apiConfig";
import { getHeaders } from "../api/getHeaders";
import Cookies from "js-cookie";
import { useHomeStore } from "../store";
import Messages from "../components/inbox/Messages";
import { Card, Container } from "react-bootstrap";
import { useGoBack } from "../components/utils/utilFunctions";
// import CancelIcon from "@mui/icons-material/Cancel";
import AddMessage from "../components/inbox/AddMessage";

const MessagePage = () => {
  const studentId = useParams().id;
  const [messages, setMessages] = useState([]);
  const GoBackButton = useGoBack();
  const addCommentRef = useRef(null);
  const commentLastRef = useRef(null);

  const student = useHomeStore((state) => state.getStudentById(studentId));

  useEffect(() => {
    // Fetch all messages from the specific user
    fetchMessages();
    addCommentRef.current.focus();
    commentLastRef.current.focus();
    commentLastRef.current?.scrollIntoView();
  }, [studentId]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    commentLastRef.current?.scrollIntoView();
  }, [messages])

  const fetchMessages = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        BASE_URL + `inbox/${studentId}/`,
        getHeaders(token)
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleMessageUpdated = () => {
    fetchMessages();
  };

  const autoReloadComments = () => {
    // Call the update function initially
    fetchMessages();

    // Set up an interval to call the update function every 5 seconds
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  };

  // Run the auto-reload function when the component mounts or when studentId changes
  useEffect(() => {
    autoReloadComments();
  }, [studentId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="px-5 py-4">
      <GoBackButton />
      {/* <h2>Messages with {student.full_name}</h2> */}
      {/* <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul> */}
      <Container className="container-sm">
        <Card className="card ">
            <Card.Header className="sticky-header" style={{background: '#f5ebe0'}}>
            <h2>Messages with {student.full_name}</h2>
            </Card.Header>
          <Card.Body className=" mb-3 comment-section">
            {/* overflow-auto  */}
            <Messages
              student={student}
              student_id={studentId}
              messages={messages}
              setMessages={setMessages}
                handleMessageUpdated={handleMessageUpdated}
              //   handleReply={handleReply}
              //   addCommentRef={addCommentRef}
              //   replyParentComment={replyParentComment}
            />
            {/* {replyParentComment.user && (
              <div
                className="thumbnail mt-2 reply-thumbnail"
                ref={commentLastRef}
              >
                <span>
                  <small>@{replyParentComment.username}</small>
                </span>
                <p className="mb-0">
                  {replyParentComment.content}{" "}
                  <small className="text-end">
                    <CancelIcon onClick={handleCancelReply} />
                  </small>
                </p>
              </div>
            )}*/}
            <div ref={commentLastRef}></div> 
          </Card.Body>
          {/* <Card.Footer> */}
          <AddMessage
            student={student}
            handleMessageUpdated={handleMessageUpdated}
            addCommentRef={addCommentRef}
            // replyParentComment={replyParentComment}
            // setReplyParentComment={setReplyParentComment}
            // scrollToAddComment={scrollToAddComment}
          />
          {/* </Card.Footer> */}
        </Card>
      </Container>
    </div>
  );
};

export default MessagePage;
