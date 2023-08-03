// import { FaTimes } from "react-icons/fa";
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import axios from "axios";
import BASE_URL from "../../api/apiConfig";
import { getHeaders } from '../../api/getHeaders';
import useErrorCheck from './../utils/useErrorCheck';
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';

const DeleteMessage = ({ message, studentId, handleMessageUpdated }) => {
  const token = Cookies.get('token')
  const errorCheck = useErrorCheck();
  const handleDeleteMessage = async () => {
    try {
      await axios.delete(
        BASE_URL + `inbox/${message.id}/delete/`,
        getHeaders(token)
      );
      handleMessageUpdated();
    } catch (error) {
      errorCheck(error)
      
      // console.log(comment.id);
    }
  };

  return (
    <>
      {/* <DeleteForeverIcon onClick={handleDeleteMessage} style={{ color: "red" }} /> */}
      <Button
        variant="danger"
        size="sm"
        onClick={handleDeleteMessage}
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteMessage;
