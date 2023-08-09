import { useState } from "react";
import { getHeaders } from "../api/getHeaders";
import useErrorCheck from "./utils/useErrorCheck";
import FlagTwoToneIcon from "@mui/icons-material/FlagTwoTone";
import axios from "axios";
import BASE_URL from "../api/apiConfig";
import Cookies from "js-cookie";
import { useHomeStore } from "../store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const FlagComment = ({ comment }) => {
  const [details, setDetails] = useState("");
  const [openCategory, setOpenCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const token = Cookies.get("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const errorCheck = useErrorCheck();
  const categories = useHomeStore((state) => state.reportCategories);

  const [isFlagged, setIsFlagged] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpenCategory = () => {
    setOpenCategory(!openCategory);
    setIsFlagged(false)
    setMessage("")
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleFlagComment = async () => {
    if (selectedCategory) {
      // Call the parent component's onFlagComment function with the selected category
      //   onFlagComment(selectedCategory);
      try {
        await axios.post(
          BASE_URL + "flag-comment/",
          {
            comment: comment.id,
            reporter: user.id,
            description: details,
            category: selectedCategory,
          },
          getHeaders(token)
        );
        setIsFlagged(true);
        setMessage("Comment successfully reported.");
        setOpenCategory(false);
        setSelectedCategory("");
      } catch (error) {
        errorCheck(error);
      }
    } else {
        setMessage("Select a category")
    }
  };

  return (
    <>
      <div
        className="hover-blue"
        onClick={handleOpenCategory}
        style={{ cursor: "pointer" }}
      >
        <FlagTwoToneIcon className="sidebar-icon" /> Report Comment
      </div>
      {isFlagged && <div className="text-success">{message}</div>}

      {openCategory && (
        <>
          <ArrowBackIcon
            className="sidebar-img hover-blue"
            onClick={() => setOpenCategory(false)}
          />{" "}
          <br />
          
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>{" "}
          <small className="text-danger ml-2">{message}</small>
          <br />
          <input
            type="text"
            value={details}
            onChange={handleDetailsChange}
            placeholder="Additional details"
          />
          <button className="btn btn-sm btn-danger m-1" onClick={handleFlagComment}>Flag Comment</button> <br/>
        </>
      )}
    </>
  );
};

export default FlagComment;
