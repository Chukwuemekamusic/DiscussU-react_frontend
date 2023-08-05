// import RoomsFeed from "../components/RoomsFeed";
import CategoriesFeed from "../components/CategoriesFeed";
import { useHomeStore } from "../store";
// import { useNavigate } from "react-router";
import useHandleLogout from "../components/utils/useHandleLogout";
// import { useHomeStore } from "../store";
import "./Home.css"
import RoomsFeed2 from "../components/RoomsFeed2";


const HomePage = ({ sortRoomsByCategory, token, setSearchQuery }) => {

  const [rooms, categories] = useHomeStore((state) => [
    state.rooms,
    state.categories, 

  ]);
  const handleLogout = useHandleLogout()
  // const user = JSON.parse(localStorage.getItem('user'))
  
  if (!token) { // && !user
    handleLogout()
    return null
  }


  // console.log("path", user);

  return (

    <div className=" py-4 px-5">
      <div className="row mt-5">
        
        <div className="col-lg-8">
          {/* Discussion Rooms */}
          <h1 className="home-title">Discussion Rooms</h1>
         
          {/* <RoomsFeed rooms={rooms} /> */}
          <RoomsFeed2 rooms={rooms} />
        </div>

        <div className="col-lg-4">
          {/* category list */}
          <h1 className="home-title">Category</h1>
          <hr className="divider"/>
          <CategoriesFeed
            sortRoomsByCategory={sortRoomsByCategory}
            categories={categories}
            setSearchQuery={setSearchQuery}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
