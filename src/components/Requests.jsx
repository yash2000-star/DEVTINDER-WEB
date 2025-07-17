import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from 'react-icons/fa'; // Icons for our buttons

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

    const reviewRequest = async (status, requestId) => {
        try {
            await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`, {}, { withCredentials: true });
            dispatch(removeRequests(requestId));
        } catch (err) {
            console.error(`Failed to ${status} request:`, err);
        }
    };

    const fetchRequests = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/requests/received`, {
                withCredentials: true,
            });
            dispatch(addRequests(res.data.data));
        } catch (err) {
            console.error("Failed to fetch requests:", err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);
    

    if (!requests) {
        return (
            <div className="text-center p-8">
                <span className="loading loading-lg loading-spinner"></span>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="text-center p-12 bg-base-200 rounded-lg">
                <h2 className="text-2xl font-bold">No Pending Requests</h2>
                <p className="text-base-content/70 mt-2">
                    You're all caught up!
                </p>
                <Link to="/" className="btn btn-primary mt-6">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {requests.map((request) => {
                const { _id: fromUserId, firstName, lastName, photoUrl, about } = request.fromUserId;

                return (
                    <div 
                        key={request._id} 
                        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-base-200 rounded-lg hover:bg-base-200 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="avatar">
                                <div className="w-16 rounded-full">
                                    <img 
                                        src={photoUrl || `https://ui-avatars.com/api/?name=${firstName}+${lastName}`} 
                                        alt={`${firstName} ${lastName}`} 
                                    />
                                </div>
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{firstName} {lastName}</h3>
                                <p className="text-sm text-base-content/70 line-clamp-1">
                                    {about || "Wants to connect with you."}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button 
                                className="btn btn-sm btn-ghost" 
                                onClick={() => reviewRequest("rejected", request._id)}
                            >
                                <FaTimes />
                                Decline
                            </button>
                            <button 
                                className="btn btn-sm btn-success text-white" 
                                onClick={() => reviewRequest("accepted", request._id)}
                            >
                                <FaCheck />
                                Accept
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Requests;