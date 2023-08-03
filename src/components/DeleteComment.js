// import { FaTimes } from "react-icons/fa";
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import { getHeaders } from "../api/getHeaders";
import BASE_URL from "../api/apiConfig";
import useErrorCheck from './utils/useErrorCheck';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';

const DeleteComment = ({ comment, handleCommentUpdated }) => {
  const token = Cookies.get('token')
  const errorCheck = useErrorCheck();
  const handleDeleteComment = async () => {
    try {
      await axios.delete(
        BASE_URL + `comments/${comment.id}/delete/`,
        getHeaders(token)
      );
      handleCommentUpdated();
    } catch (error) {
      errorCheck(error)
      
      // console.log(comment.id);
    }
  };

  return (
    <>
      {/* <DeleteForeverIcon onClick={handleDeleteComment} style={{ color: "red" }} /> */}
      <Button
        variant="danger"
        size="sm"
        onClick={handleDeleteComment}
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteComment;
