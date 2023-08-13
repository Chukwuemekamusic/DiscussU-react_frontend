import React from "react";
import { Row, Col } from "react-bootstrap";
import { useGoBack } from "./utils/utilFunctions";
import { Link } from "react-router-dom";

const RoomHeader = ({ room }) => {
  const GoBack = useGoBack()
  return (
    <div className="room-header sticky-header"> 
    {/* position sticky */}
      <Row>
        <Col>
        <GoBack/>
          <h2>{room.name}</h2>
          {/* <Link to={`/student/${room.host}/profile`}>
                      {" "}
                      <i>@{room.host_name}</i>
                    </Link> */}
          <p>
            Hosted by: <Link to={`/student/${room.host}/profile`}>
              <span className="host-name">@{room.host_name}</span>
              </Link>
          </p>
          <p>
            <i>{room.description}</i>
          </p>
          
        </Col>
      </Row>
    </div>
  );
};

export default RoomHeader;
