import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";
import { FaHeart, FaTimes } from 'react-icons/fa'; 

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
    const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) => {
        if (!userId) return;
        try {
            await axios.post(`${BASE_URL}/request/send/${status}/${userId}`, {}, { withCredentials: true });
            dispatch(removeUserFeed(userId)); 
        } catch (err) {
            console.error("Failed to send request:", err);
        }
    };

    return (
        <div className="card w-full max-w-sm bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <div className="avatar">
                    <div className="w-48 h-48 rounded-xl">
                         <img
                            src={photoUrl || `https://ui-avatars.com/api/?name=${firstName}+${lastName}&size=256`}
                            alt={`${firstName} ${lastName}`}
                            className="object-cover"
                        />
                    </div>
                </div>
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title text-3xl">{firstName} {lastName}</h2>
                {age && gender && <p className="text-base-content/70">{age}, {gender}</p>}
                <p className="mt-2 min-h-[3rem]">{about}</p>
                
                <div className="card-actions justify-center mt-4 w-full flex gap-4">
                    <button
                        className="btn btn-lg btn-circle btn-outline"
                        onClick={() => handleSendRequest("ignored", _id)}
                    >
                        <FaTimes size={24} />
                    </button>
                    <button
                        className="btn btn-lg btn-circle btn-primary"
                        onClick={() => handleSendRequest("interested", _id)}
                    >
                        <FaHeart size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;