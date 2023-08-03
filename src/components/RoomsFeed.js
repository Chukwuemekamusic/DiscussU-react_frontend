// import { Link } from "react-router-dom";
// import moment from "moment";

// const RoomsFeed = ({ rooms }) => {
//   return (
//     <article>
//       {rooms.map((room) => {
//         return (
//           <div key={room.id}>
//             <h3>
//               <Link to={`/room/${room.id}`}>{room.name}</Link>
//             </h3>
//             <div>
//               @<i>{room.host_name} </i>
//               <small>created: {moment(room).fromNow()}</small>
//             </div>
//             {room.description && (
//               <div className="roomfeed_description">
//                 {room.description.length <= 50
//                   ? room.description
//                   : `${room.description.slice(0, 50)}...`}
//               </div>
//             )}
//             <small>{room.category}</small>
//           </div>
//         );
//       })}
//     </article>
//   );
// };

// export default RoomsFeed;
