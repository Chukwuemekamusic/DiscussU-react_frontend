import useHandleLogout from "./utils/useHandleLogout";
// import { useHomeStore } from "../store";

const LogoutButton = () => {

  const handleLogout = useHandleLogout();  

  return <span onClick={() => handleLogout()} className="text-danger "><strong> Logout </strong></span>;
};

export default LogoutButton;

// import { useContext } from "react";
// import AuthContext from "../context/AuthProvider";
// import { useNavigate } from "react-router";
// import axios from "axios";
// import { getHeaders } from "../api/getHeaders";
// // import useHandleLogout from "./utils/useHandleLogout";

// const LogoutButton = () => {
//     const { logout, auth } = useContext(AuthContext);
//     const navigate = useNavigate()
//     const handleLogout = async() => {

//         logout();
//         await logoutapi()
//         navigate('/login')
//     };
//     // const handleLogout = useHandleLogout()
//     // handleLogout()

//     const logoutapi = async () => {
//         try {
//           await axios.post(
//             `http://localhost:8000/api/users/logout/`,
//             getHeaders(auth.token)
//           )

//         } catch (error) {
//           console.error(error);
//         }
//       }

//     return (
//         <button onClick={handleLogout}>Logout</button>
//     );
// };

// export default LogoutButton;
