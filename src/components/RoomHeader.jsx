import React from "react";
import { Row, Col } from "react-bootstrap";
import { useGoBack } from "./utils/utilFunctions";

const RoomHeader = ({ room }) => {
  const GoBack = useGoBack()
  return (
    <div className="room-header sticky-header"> 
    {/* position sticky */}
      <Row>
        <Col>
        <GoBack/>
          <h2>{room.name}</h2>
          <p>
            Hosted by: <span className="host-name">@{room.host_name}</span>
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
