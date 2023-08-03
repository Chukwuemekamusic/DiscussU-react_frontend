import "./App.css";
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  // useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import RoomPage from "./pages/RoomPage";
import Login from "./pages/Login";
import NavbarMain from "./components/NavbarMain";


import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getHeaders } from "./api/getHeaders";
import BASE_URL from "./api/apiConfig";
import Cookies from "js-cookie";
import { useHomeStore } from "./store";
import Form from "./components/Form";
import RoomCreateForm from "./components/RoomCreateForm";

import useErrorCheck from "./components/utils/useErrorCheck";
import RoomUpdateForm from "./components/RoomUpdateForm";
import UserProfilePage from "./pages/UserProfile";
import Inbox from "./pages/Inbox";
import MessagePage from "./pages/MessagePage";

import { Container, Row, Col } from "react-bootstrap";

import Sidebar2 from "./components/Sidebar2";

import FormEditProfile from "./components/FormEditProfile";
import StudentProfilePage from "./pages/StudentProfile";
import ErrorMessage from "./components/ErrorMessage";


function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const errorCheck = useErrorCheck();
  const [
    rooms,
    setRooms,
    setCategories,
    setReportCategories,
    isopen,
    setIsOpen,
    setSchools,
    // schools,
    updateUserData,
    getStudentsProfile,
    // updateFollowData,
    errorMessage,
    setErrorMessage,
  ] = useHomeStore((state) => [
    state.rooms,
    state.setRooms,
    state.setCategories,
    state.setReportCategories,
    state.isopen,
    state.setIsopen,
    state.setSchools,
    // state.schools,
    state.updateUserData,
    state.getStudentsProfile,
    // state.updateFollowData,
    state.errorMessage,
    state.setErrorMessage,
  ]);
  const token = Cookies.get("token");
  const topRef = useRef(null);

  useEffect(() => {
    getRoomsData(searchQuery);
    getCategoriesData();
    getReportCategoriesData();
    getSchoolsData();
    updateUserData();
    getStudentsProfile();
    // topRef.current.scrollIntoView({ behavior: "smooth" });
    setSearchQuery("");
    //  eslint-disable-next-line
  }, [token]);

  useEffect(() => {
    getRoomsData(searchQuery);
    getCategoriesData();
    getReportCategoriesData();
  }, [searchQuery]);

  

  // const { auth } = useContext(AuthContext);
  // console.log(auth.token);

  const getRoomsData = async (q) => {
    // const token = Cookies.get("token");
    try {
      const response = await axios.get(
        BASE_URL + `rooms/?q=${q}`,
        getHeaders(token)
      );
      const data = await response.data;
      setRooms(data);
      // console.log(data);
    } catch (error) {
      errorCheck(error);
    }
  };

  const getCategoriesData = async () => {
    try {
      const response = await axios.get(
        BASE_URL + `categories/`,
        getHeaders(token)
      );
      const data = await response.data;
      setCategories(data);
    } catch (error) {}
  };

  const getReportCategoriesData = async () => {
    try {
      const response = await axios.get(
        BASE_URL + `report-categories/`,
        getHeaders(token)
      );
      const data = await response.data;
      setReportCategories(data);
      // console.log('report_cat', data);
    } catch (error) {}
  };

  const sortRoomsByCategory = (q) => {
    getRoomsData(q);
  };

  // get List of schools
  const getSchoolsData = async () => {
    try {
      const response = await axios.get(BASE_URL + `schools/`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const data = await response.data;
      setSchools(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseError = () => {
    setErrorMessage("");
  };

  useEffect(() => {  // this will handle the error message setting and clearing
    if (errorMessage) {
      // Scroll to the top of the page when there's an error
      topRef.current.scrollIntoView({ behavior: "smooth" });

      // clear error message
      const timeout = setTimeout(() => {
        setErrorMessage("");
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [errorMessage]);

  return (
    <div className=" " ref={topRef}>
      {/* <AuthHeaders /> */}
      {/* <Router> */}
      <NavbarMain
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isopen={isopen}
        setIsOpen={setIsOpen}
        sortRoomsByCategory={sortRoomsByCategory}
      />
      {/* className=" d-flex" */}
      <Container fluid className="body pt-4">
        <Row>
          <Col md={2} className="p-0 mt-2 ">
            {/* <Sidebar setSearchQuery={setSearchQuery}/> */}
            <Sidebar2
              setSearchQuery={setSearchQuery}
              sortRoomsByCategory={sortRoomsByCategory}
            />
            {/* <Sidebar3 setSearchQuery={setSearchQuery}/> */}
          </Col>

          {/* style={{border: "1px red solid"}} */}
          <Col md={10} className="p-0 ">
            {/* <div className="body"> */}
            {errorMessage && (
              <ErrorMessage message={errorMessage} onClose={handleCloseError} />
            )}
            <Routes>
              <Route
                element={
                  <HomePage
                    searchQuery={searchQuery}
                    sortRoomsByCategory={sortRoomsByCategory}
                    token={token}
                  />
                }
                path="/"
              />
              <Route element={<RoomPage rooms={rooms} />} path="/room/:id" />
              <Route element={<Login />} path="/login" />
              <Route element={<Form />} path="/register" />
              <Route element={<FormEditProfile />} path="/edit-profile" />
              <Route
                element={<RoomCreateForm getRoomsData={getRoomsData} />}
                path="/room/create"
              />
              <Route element={<RoomUpdateForm />} path="/room/:roomId/update" />
              <Route element={<UserProfilePage />} path="/user/profile" />
              <Route
                element={<StudentProfilePage />}
                path="/student/:id/profile"
              />

              <Route element={<Inbox />} path="/inbox" />
              <Route element={<MessagePage />} path="/inbox/:id" />
            </Routes>
            {/* </div> */}
          </Col>
        </Row>
      </Container>

      {/* </Router> */}
    </div>
  );
}

export default App;
