import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../api/apiConfig";
import { getHeaders } from "../api/getHeaders";
import Cookies from "js-cookie";
import { Card } from "react-bootstrap";
import { handleDateAndTime } from "../components/utils/utilFunctions";

const Inbox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch private messages from the backend
    const fetchMessages = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          BASE_URL + "inbox/",
          getHeaders(token)
        );
        // console.log('messages', response.data);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []); 

  if (messages.length === 0) {
    return (
      <div className="py-4 px-5 mt-5">
        <h1>Inbox</h1>
        <p>No message available for you.</p>
      </div>
    );
  }

  return (
    <div className="py-4 px-5 mt-5">
      <h1>Inbox</h1>
      {messages.map((message) => (
        <Card key={message.id} className="m-2 mb-3">
          <Card.Header>
            <div className="d-flex align-items-center">
              {/* <Image
                    src={comment.user_profile_pic}
                    roundedCircle
                    className="profile-pic mr-3"
                  /> */}
              <div>
                <h6 className="mb-0">{message.sender_full_name}</h6>
                {/* {console.log(comment.user)} */}
                <Link to={`/student/${message.sender}/profile`}>
                  <small className="host-name">@{message.sender_name}</small>
                </Link>
                <small className="text-muted m-2 ">
                  {handleDateAndTime(message.created)}
                </small>
              </div>
            </div>
          </Card.Header>
          <Link
            to={`/inbox/${message.sender}`}
            style={{ textDecoration: "none", color: "#333" }}
          >
            <Card.Body className="hover-blue">{message.content}</Card.Body>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default Inbox;
