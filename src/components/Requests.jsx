import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
// Using Heroicons to match our theme
import { HiCheck, HiX } from 'react-icons/hi';

const Requests = () => {
    // Your state and logic are perfect and remain here
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, requestId) => {
        // This function is perfect, just updating the UI instantly
        dispatch(removeRequests(requestId));
        try {
            await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`, {}, { withCredentials: true });
        } catch (err) {
            console.error(`Failed to ${status} request:`, err);
            // Optionally, you could re-fetch requests here if the API call fails
        }
    };

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/user/requests/received`, { withCredentials: true });
                dispatch(addRequests(res.data.data));
            } catch (err) {
                console.error("Failed to fetch requests:", err);
            }
        };
        // Fetch only if the requests list is null (on first load)
        if (requests === null) {
            fetchRequests();
        }
    }, [dispatch, requests]);
    
    // A better loading state
    if (requests === null) {
        return <div className="text-center p-8 text-slate-600">Loading requests...</div>;
    }

    // A themed "No Requests" view
    if (requests.length === 0) {
        return (
            <div className="text-center p-12 bg-white/20 backdrop-blur-lg rounded-2xl">
                <h2 className="text-2xl font-bold text-slate-800">No Pending Requests</h2>
                <p className="text-slate-600 mt-2">You're all caught up!</p>
            </div>
        );
    }

    return (
        // The main container for the list of request cards
        <div className="max-w-2xl mx-auto space-y-4">
            {requests.map((request) => {
                // Ensure fromUserId exists before trying to destructure
                if (!request.fromUserId) return null;
                
                const { _id: fromUserId, firstName, lastName, photoUrl, about } = request.fromUserId;

                return (
                    // Each request is now a beautiful glass card
                    <div 
                        key={request._id} 
                        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/20 backdrop-blur-lg border border-white/40 rounded-2xl shadow-lg"
                    >
                        {/* User Info Section */}
                        <Link to={`/users/${fromUserId}`} className="flex items-center gap-4 group">
                            <img 
                                src={photoUrl || '/default-avatar.png'}
                                alt={`${firstName} ${lastName}`} 
                                className="w-16 h-16 rounded-full object-cover ring-2 ring-pink-500/30 group-hover:ring-pink-500 transition"
                            />
                            <div>
                                <h3 className="font-bold text-lg text-slate-900">{firstName} {lastName}</h3>
                                <p className="text-sm text-slate-600 line-clamp-1">
                                    {about || "Wants to connect with you."}
                                </p>
                            </div>
                        </Link>

                        {/* Action Buttons Section */}
                        <div className="flex gap-3 shrink-0">
                            <button 
                                className="btn-request-action bg-slate-900/5 text-slate-600 hover:bg-slate-900/10 hover:text-slate-800"
                                onClick={() => reviewRequest("rejected", request._id)}
                            >
                                <HiX size={20} />
                            </button>
                            <button 
                                className="btn-request-action bg-green-500 text-white hover:bg-green-600"
                                onClick={() => reviewRequest("accepted", request._id)}
                            >
                                <HiCheck size={20} />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Requests;