import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/contants';
import EditProfile from './EditProfile'; 
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Profile = () => {
    const { userId } = useParams();
    const loggedInUser = useSelector((store) => store.user);
    const [profileData, setProfileData] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            const targetId = userId || loggedInUser?._id;
            if (!targetId) {
                setIsLoading(false); return;
            }
            try {
              const res = await axios.get(`${BASE_URL}/get-user-by-id/${targetId}`, { withCredentials: true });
              setProfileData(res.data.data);
              setIsOwnProfile(!userId || userId === loggedInUser?._id);
            } catch (error) {
              console.error("Failed to fetch user profile:", error);
            } finally {
              setIsLoading(false);
            }
          };
          fetchProfile();
      }, [userId, loggedInUser]);

    const handleProfileUpdate = (updatedData) => {
        setProfileData(updatedData);
        setIsEditing(false); 
    }

    if (isLoading) return <div className="text-xl text-center">Loading...</div>;
    if (!profileData) return <div className="text-xl text-red-400 text-center">Profile not found.</div>;

    if (isOwnProfile && isEditing) {
        return <EditProfile user={profileData} onSave={handleProfileUpdate} onCancel={() => setIsEditing(false)} />;
    }

    const { firstName, lastName, photoUrl, about } = profileData;

    return (
        <div className="flex justify-center">
            {/* LIGHT THEME GLASS CARD */}
            <div className="max-w-sm bg-white/20 backdrop-filter backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-8 text-center text-slate-800">
                <img className="w-28 h-28 rounded-full ring-2 ring-pink-500/50 mx-auto -mt-20 object-cover" src={photoUrl || '/default-avatar.png'} alt="User profile" />
                <div className="mt-6">
                    <h1 className="text-3xl font-bold text-slate-900">{firstName} {lastName}</h1>
                    <p className="text-lg text-slate-600 mt-2">{about || "I'm a UI/UX designer..."}</p>
                </div>
                <div className="flex justify-center gap-6 my-8">
                    <a href="#" className="social-icon-profile-light"><FaFacebookF /></a>
                    <a href="#" className="social-icon-profile-light"><FaTwitter /></a>
                    <a href="#" className="social-icon-profile-light"><FaLinkedinIn /></a>
                </div>
                {isOwnProfile ? (
                    <button onClick={() => setIsEditing(true)} className="btn-profile-main-action-light">Edit Profile</button>
                ) : (
                    <button className="btn-profile-main-action-light">Message Me</button>
                )}
            </div>
        </div>
    );
};

export default Profile;