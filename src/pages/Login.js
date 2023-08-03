import { useState, useRef, useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "axios";
import BASE_URL from "../api/apiConfig";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone"; // login
import { useHomeStore } from "../store";
import useErrorCheck from "../components/utils/useErrorCheck";

const Login = () => {
  const { setAuth} = useContext(AuthContext);
  const returnUserData = useHomeStore((state) => state.returnUserData)
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const errorCheck = useErrorCheck()
  const navigate = useNavigate();

  const checkToken = Cookies.get("token") 
  if (checkToken) {
    navigate("/")
  }

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((email === "") | (password === "")) {
      alert("both fields must be filled!");
      // return
    }
    try {
      const response = await axios.post(
        BASE_URL + `users/login/`,
        { email: email, password: password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const token = response.data.token;
      const expiry = response.data.expiry
      Cookies.set("token", token);
      Cookies.set("expiry", expiry)
      
      setAuth({ token });
      
      // reset input
      setEmail("");
      setPassword("");
      const user = await returnUserData(token) // retrieves the user detail and save to local storage
      localStorage.setItem("user", JSON.stringify(user))
      window.location.reload() // TODO fix this temporal solution
      navigate("/");
    } catch (error) {
      errorCheck(error)
    }
  };

  return (
    <div className="container-md p-3">
      <h1 >Log in Your Details</h1>
      <p
        ref={errRef}
        aria-live="assertive"
        className="text-danger"
      >
        {errMsg}
      </p>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          className="form-control"
          type="text"
          id="email"
          ref={userRef}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>

        <div className="mb-3">
        <label htmlFor="password" className="form-label"> Password</label>
        <input
        className="form-control"
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        <button type="submit" className="btn btn-primary">
          {" "}
          <LoginTwoToneIcon /> Login
        </button>
      </form>
      <p>If you don't have an account, click below</p>
      <Link to={"/register"}>register here</Link>
    </div>
  );
};

export default Login;