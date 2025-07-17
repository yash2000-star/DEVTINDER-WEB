// src/pages/connections.jsx

import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/ConnectionsSlice";
import { Link } from 'react-router-dom'; 
import { FaUserTimes, FaEye } from 'react-icons/fa'; 

const Connections = () => {
    const connections = useSelector(store => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/connections`, {
                withCredentials: true,
            });
            dispatch(addConnections(res.data.data));
        } catch (err) {
            console.error("Failed to fetch connections:", err);
        }
    };

    useEffect(() => {
        if (!connections || connections.length === 0) {
            fetchConnections();
        }
    }, []);
    // ---

    if (!connections) {
        return (
            <div className="text-center p-8">
                <span className="loading loading-lg loading-spinner"></span>
            </div>
        );
    }
    
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

    return (
        <div className="space-y-4">
            {connections.map((connection) => {
                const { _id, firstName, lastName, photoUrl, about } = connection;

                return (
                    <div 
                        key={_id} 
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
                                    {about || "This is a default about the user."}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="btn btn-sm btn-outline btn-error">
                                <FaUserTimes />
                                Remove
                            </button>
                            <Link to={`/users/${_id}`} className="btn btn-sm btn-primary">
                               <FaEye />
                                 View Profile
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Connections;