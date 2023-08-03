import TextsmsTwoToneIcon from "@mui/icons-material/TextsmsTwoTone";
import { useNavigate } from "react-router-dom";

const Chat = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/inbox/${user.id}`);
  };
  return (
    <>
      <span className="cursor-pointer hover-blue" onClick={handleClick}>
        <TextsmsTwoToneIcon className="sidebar-icon" /> Message
      </span>
    </>
  );
};

export default Chat;
