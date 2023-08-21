import React, { useState } from "react";
import { useStoreFns } from "../store";
import { useNavigate } from "react-router";
// import { useHomeStore } from "../store";

const DeleteRoom = ({ roomId }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const deleteRoom = useStoreFns((state) => state.deleteRoom);
  // const updateRoomsData = useHomeStore((state) => state.updateRoomsData)
  const navigate = useNavigate();

  const handleDelete = async () => {
    // Call the deleteRoom function to delete the room
    await deleteRoom(roomId);
    // await updateRoomsData();
    navigate("/")
  };

  return (
    <>
      {showConfirm ? (
        <div>
          <p>Are you sure you want to delete this room?</p>
          <button onClick={handleDelete} className="btn btn-danger btn-sm">Yes, delete</button>
          <button onClick={() => setShowConfirm(false)} className="btn btn-primary btn-sm">Cancel</button>
        </div>
      ) : (
        <button onClick={() => setShowConfirm(true)} className="btn btn-danger btn-sm">Delete Room</button>
      )}
    </>
  );
};

export default DeleteRoom;
