import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/contants';
import EditProfile from '../components/EditProfile'; 

const UserConnections = ({ userId }) => {
    return <div className="text-center p-8 text-base-content/70">Connections for this user would be displayed here.</div>;
};

const Profile = () => {
  const { userId } = useParams();
  
  const loggedInUser = useSelector((store) => store.user);

  const [profileData, setProfileData] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('info'); 

  useEffect(() => {
    const fetchUserProfile = async () => {
      setProfileData(null);
      try {
        const res = await axios.get(`${BASE_URL}/get-user-by-id/${userId}`, { withCredentials: true });
        setProfileData(res.data.data);
        setIsOwnProfile(false); 
        setActiveTab('info'); 
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    if (userId) {
      fetchUserProfile();
    } else {
      setProfileData(loggedInUser);
      setIsOwnProfile(true);
      setActiveTab('edit'); 
    }
  }, [userId, loggedInUser]); 


  if (!profileData) {
    return (
      <div className="flex justify-center items-center p-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const { firstName, lastName, photoUrl, about, age, gender } = profileData;

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center gap-6 p-4">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img 
              src={photoUrl || `https://ui-avatars.com/api/?name=${firstName}+${lastName}`} 
              alt="User profile" 
            />
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-center sm:text-left">{firstName} {lastName}</h1>
          <p className="text-lg text-base-content/70 text-center sm:text-left">
            {age && gender ? `${age}, ${gender}` : 'Software Engineer'}
          </p>
        </div>
      </div>

      <div className="divider my-4"></div>

      <div className="tabs tabs-bordered">
        <a 
          className={`tab tab-lg ${activeTab === 'info' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('info')}
        >
          About
        </a>
        <a 
          className={`tab tab-lg ${activeTab === 'connections' ? 'tab-active' : ''}`}
          onClick={() => setActiveTab('connections')}
        >
          Connections
        </a>
        {isOwnProfile && (
          <a 
            className={`tab tab-lg ${activeTab === 'edit' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('edit')}
          >
            Edit Profile
          </a>
        )}
      </div>

      <div className="mt-6 p-4">
        {activeTab === 'info' && (
          <div className="prose max-w-none">
            <p>{about || 'No information provided.'}</p>
          </div>
        )}
        {activeTab === 'connections' && <UserConnections userId={userId || loggedInUser._id} />}
        {isOwnProfile && activeTab === 'edit' && <EditProfile user={profileData} />}
      </div>
    </div>
  );
};

export default Profile;