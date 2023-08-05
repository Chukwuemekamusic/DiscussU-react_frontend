import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useHomeStore } from "../store";
import { Link, useParams } from "react-router-dom";
import MyRooms from "../components/profile/MyRooms";
import { useGoBack } from "../components/utils/utilFunctions";
import FollowUnfollow from "../components/FollowUnfollow";
import Chat from "./Chat";
import withAuth from "../context/withAuth";
// import { useHomeStore } from "../store";

const StudentProfilePage = () => {
  const GoBackButton = useGoBack();
  const params = useParams();
  const student_id = params.id;

  const rooms = useHomeStore((state) => state.rooms);
  // const getStudentsProfile = useHomeStore((state) => state.getStudentsProfile);
  // const user = JSON.parse(localStorage.getItem("user"));

  // useEffect(() => {
  //   getStudentsProfile();
  // })

  const students = JSON.parse(localStorage.getItem("students"));
  const student = students.find(
    (student) => student.id === parseInt(student_id)
  );
  console.log("student", student);
  // const user = JSON.parse(localStorage.getItem("user"));
  // const student_rooms = rooms.filter((room) => room.host === student.id);

  console.log("students", students);
  console.log("rooms", rooms);
  console.log("student_id", student.id);

  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowedUsers, setShowFollowedUsers] = useState(false);

  return (
    <Container>
      <GoBackButton />
      <Row className="mt-5">
        <Col md={4}>
          <Card>
            <Card.Img
              variant="top"
              src={student.profile_pic}
              className="img-fluid"
            />
            <Card.Body>
              <Card.Title>{student.full_name}</Card.Title>
              <Card.Subtitle className="host-name">
                @{student.username}
              </Card.Subtitle>
              <Card.Text>{student.email}</Card.Text>
              <FollowUnfollow userId={student.id} /> 
              <Chat user={student}/>
              <hr />

              <Card.Text>{student.school_name}</Card.Text>
              <Card.Text>Course: {student.course}</Card.Text>

              <Card.Text>
                Followers: {student.no_of_followers}{" "}
                <Button
                  size={"sm"}
                  onClick={() => setShowFollowers(!showFollowers)}
                >
                  {showFollowers ? "Hide" : "Show"} Followers
                </Button>
              </Card.Text>
              {showFollowers && (
                //Render list of followers here
                <Card.Text>
                  {student.followers.map((follower) => (
                    <div
                      key={follower.id}
                      onClick={() => setShowFollowers(false)}
                    >
                      <Link
                        to={`/student/${follower.id}/profile`}
                        className="host-name"
                      >
                        {follower.full_name} (@{follower.username})
                      </Link>
                      {/* {follower.id !== user.id && <FollowUnfollow userId={follower.id}/>} */}
                    </div>
                  ))}
                </Card.Text>
              )}

              <Card.Text>
                Following: {student.no_of_followed}{" "}
                <Button
                  size={"sm"}
                  onClick={() => setShowFollowedUsers(!showFollowedUsers)}
                >
                  {showFollowedUsers ? "Hide" : "Show"} Following
                </Button>
              </Card.Text>
              {showFollowedUsers && (
                // Render list of followed users here
                <Card.Text>
                  {student.followed_users.map((followedUser) => (
                    <div
                      key={followedUser.id}
                      onClick={() => setShowFollowedUsers(false)}
                    >
                      <Link
                        to={`/student/${followedUser.id}/profile`}
                        className="host-name"
                      >
                        {followedUser.full_name} (@{followedUser.username})
                      </Link>
                    </div>
                  ))}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Headlines</Card.Title>
              {/* {student.about} */}
              <Card.Text>{student.bio}</Card.Text>
            </Card.Body>
          </Card>
          <Row className="mt-4">
            <MyRooms title={"Hosted Rooms"} user={student} />
          </Row>

          {/* <Row className="mt-4">
            <MyParticipatedRooms user={student} />
          </Row> */}
        </Col>
      </Row>
    </Container>
  );
};

export default withAuth(StudentProfilePage);
