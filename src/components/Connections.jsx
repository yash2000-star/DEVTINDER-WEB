// src/pages/connections.jsx

import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/ConnectionsSlice";
import { Link } from 'react-router-dom';
import { FaUserTimes, FaEye } from 'react-icons/fa';

const Connections = () => {
    // ✅ CORRECTED SELECTORS
    // This now correctly reads the array from the Redux store.
    const connections = useSelector(store => store.connections) || [];
    // Assuming user slice stores the user object directly.
    // If user is at `store.user.user`, change this back to `store.user?.user`.
    const loggedInUser = useSelector(store => store.user);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/user/connections`, {
                    withCredentials: true,
                });
                // Your reducer will put `res.data.data` into the `connections` slice
                dispatch(addConnections(res.data.data));
            } catch (err) {
                console.error("Failed to fetch connections:", err);
            }
        };

        // This logic is now sound. It will run once `loggedInUser` is populated.
        if (loggedInUser && connections.length === 0) {
            fetchConnections();
        }
    }, [dispatch, connections.length, loggedInUser]);

    // --- GUARD CLAUSE ---
    // If the app is still loading the logged in user, show loading state.
    if (!loggedInUser) {
        return (
            <div className="text-center p-8">
                <p>Loading your profile...</p>
                <span className="loading loading-lg loading-spinner text-primary mt-4"></span>
            </div>
        );
    }
    
    // After fetch, if connections array is still empty, show "No Connections".
    // This now correctly checks the populated array.
    if (connections.length === 0) {
        return (
            <div className="text-center p-12 bg-base-200 rounded-lg">
                <h2 className="text-2xl font-bold">No Connections Yet</h2>
                <p className="text-base-content/70 mt-2">
                    Start exploring and connect with other developers!
                </p>
                <Link to="/" className="btn btn-primary mt-6">Find Developers</Link>
            </div>
        );
    }

    // This will now render correctly!
    return (
        <div className="space-y-4">
            {connections.map((connection) => {
                const otherUser = connection.fromUserId._id === loggedInUser._id
                    ? connection.toUserId
                    : connection.fromUserId;

                if (!otherUser) return null;

                const { _id, firstName, lastName, photoUrl, about } = otherUser;

                return (
                    <div
                        key={connection._id}
                        className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border border-base-200 rounded-lg hover:bg-base-200 transition-colors"
                    >
                        <div className="flex items-center gap-4 flex-grow">
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
                                    {about || "No bio available."}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2 items-center shrink-0">
                            <Link to={"/chat/" + _id}>
                                <button className="btn btn-sm btn-primary">Chat</button>
                            </Link>
                            <Link to={`/users/${_id}`} className="btn btn-sm btn-outline">
                                <FaEye />
                                Profile
                            </Link>
                            <button className="btn btn-sm btn-ghost btn-square text-error">
                                <FaUserTimes />
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Connections;