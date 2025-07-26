import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { addConnections } from "../utils/ConnectionsSlice";
// Import new icons for the actions
import { HiOutlineChatAlt2, HiOutlineTrash } from 'react-icons/hi';

const Connections = () => {
    const connections = useSelector(store => store.connections) || [];
    const loggedInUser = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConnections = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/user/connections`, { withCredentials: true });
                dispatch(addConnections(res.data.data));
            } catch (err) {
                console.error("Failed to fetch connections:", err);
            }
        };
        if (loggedInUser && connections.length === 0) {
            fetchConnections();
        }
    }, [dispatch, connections.length, loggedInUser]);

    const handleRemoveConnection = (e, connectionId) => {
        // This stops the click from navigating to the profile page
        e.stopPropagation();
        e.preventDefault();
        console.log("Removing connection:", connectionId);
        // Here you would add your API call to remove the connection
        // and then dispatch an action to update the Redux store.
    };

    const handleChatClick = (e, userId) => {
        e.stopPropagation();
        e.preventDefault();
        navigate(`/chat/${userId}`);
    };

    if (!loggedInUser) {
        return <div className="text-center p-8 text-slate-600">Loading...</div>;
    }
    
    if (connections.length === 0) {
        return (
            <div className="text-center p-12 bg-white/20 backdrop-blur-lg rounded-2xl">
                <h2 className="text-2xl font-bold text-slate-800">No Connections Yet</h2>
                <p className="text-slate-600 mt-2">Start exploring and connect with other developers!</p>
                <Link to="/" className="btn-form-primary-light inline-block mt-6">Find Developers</Link>
            </div>
        );
    }

    return (
        // THE NEW GRID LAYOUT
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {connections.map((connection) => {
                const otherUser = connection.fromUserId._id === loggedInUser._id
                    ? connection.toUserId
                    : connection.fromUserId;

                if (!otherUser) return null;
                const { _id, firstName, lastName, photoUrl } = otherUser;

                return (
                    // Each grid item is a link to the user's profile
                    <Link to={`/users/${_id}`} key={connection._id} className="group relative aspect-square block w-full overflow-hidden rounded-2xl shadow-lg">
                        
                        {/* The User's Photo */}
                        <img
                            src={photoUrl || `https://ui-avatars.com/api/?name=${firstName}+${lastName}`}
                            alt={`${firstName} ${lastName}`}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        
                        {/* The Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {/* Content inside the overlay */}
                            <div className="absolute bottom-0 left-0 p-4 w-full text-white">
                                <h3 className="font-bold text-lg">{firstName} {lastName}</h3>
                                <div className="flex items-center gap-2 mt-2">
                                    <button onClick={(e) => handleChatClick(e, _id)} className="btn-connection-action">
                                        <HiOutlineChatAlt2 size={20}/>
                                    </button>
                                    <button onClick={(e) => handleRemoveConnection(e, connection._id)} className="btn-connection-action">
                                        <HiOutlineTrash size={20}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Connections;