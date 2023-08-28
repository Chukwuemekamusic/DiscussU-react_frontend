import useHandleLogout from "./useHandleLogout";
import { useHomeStore } from "../../store";

const useErrorCheck = () => {
  const handleLogout = useHandleLogout();
  const setErrorMessage = useHomeStore((state) => state.setErrorMessage)

  const errorCheck = (error) => {

    if (error.response) {
      // Invalid Email
      if (
        error.response.data.email &&
        error.response.data.email[0] === "Enter a valid email address."
        ) {
        setErrorMessage("Enter a valid email address.")
      }
      // already existing ID
      if (
        error.response.data.student_id &&
        error.response.data.student_id[0] === "user with this student id already exists."
        ) {
        setErrorMessage("user with this student id already exists.")
      }
      // Handle API error (status code 4xx or 5xx)
      console.error(error.response.data);
      if (error.response.data.detail === "Invalid token.") {
        handleLogout();
      } else if (
        error.response.data.email &&
        error.response.data.email[0] === "user with this email already exists."
      ) {
        setErrorMessage("User with this email already exists.");
      } else if (
        error.response.data.non_field_errors &&
        error.response.data.non_field_errors[0] === "Invalid email or password."
      ) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else if (
        error.response.data.student_id &&
        error.response.data.student_id[0] === "user with this student id already exists."
      ) {
        setErrorMessage("User with this student id already exists.");
      }
    } else if (error.request) {
      // Handle request error (no response received)
      console.error("No response from server.");
      setErrorMessage(
        "No response from server. Please check your internet connection."
      );
    } else {
      // Handle other errors
      console.error("An error occurred:", error.message);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };
  return errorCheck;
};

export default useErrorCheck;
