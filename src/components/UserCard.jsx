import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about  } = user;
    const dispatch = useDispatch();


  const handleSendRequest = async (status, userId) => {
    try {
      
       const res = await axios.post(BASE_URL + "request/send/interested" + status+ "/" +userId, {}, { withCredentials: true})
       dispatch(removeUserFeed(userId));

    } catch(err) {
      
    }
  }



    return (
        <div className="card bg-base-300 w-96 shadow-sm">
  <figure className="px-10 pt-10">
    <img
      src={user.photoUrl} alt="photo"
      className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age + " ," + gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
      <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
    </div>
  </div>
</div>
    )
}

export default UserCard