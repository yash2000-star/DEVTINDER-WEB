import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";
import { Link } from 'react-router-dom';
import { HiX, HiCheck } from 'react-icons/hi';

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, about } = user;
    const dispatch = useDispatch();

    const handleAction = (status) => {
        dispatch(removeUserFeed(_id));
        try {
            axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true });
        } catch (err) {
            console.error("Failed to send request:", err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8">
            <div className="w-full max-w-sm bg-white/20 backdrop-filter backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-6 text-center text-slate-800">
                <Link to={`/users/${_id}`}>
                    {/* THIS IS THE UPDATED LINE */}
                    <img 
                        className="w-32 h-32 rounded-full ring-4 ring-pink-500/50 mx-auto -mt-20 object-cover"
                        src={photoUrl || '/default-avatar.png'}
                        alt={`${firstName} ${lastName}`}
                    />
                </Link>
                <div className="mt-5">
                    <h1 className="text-3xl font-bold text-slate-900">{firstName} {lastName}</h1>
                    <p className="text-lg text-slate-600 mt-2 px-4 min-h-[56px] line-clamp-2">
                        {about || "A passionate developer looking to connect!"}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-10">
                <button onClick={() => handleAction('ignored')} className="btn-feed-action bg-slate-900/5 hover:bg-slate-900/10 text-slate-600">
                    <HiX size={40} />
                </button>
                <button onClick={() => handleAction('interested')} className="btn-feed-action bg-pink-500/80 hover:bg-pink-500 text-white">
                    <HiCheck size={40} />
                </button>
            </div>
        </div>
    );
};

export default UserCard;