import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/contants";
import { addFeed } from "../utils/feedSlice"; 
import { Link } from 'react-router-dom';
import { HiX, HiCheck } from 'react-icons/hi';

const Feed = () => {
  const feed = useSelector((store) => store.feed) || [];
  const loggedInUser = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // NEW STATE: To track which user card we are currently on
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
        dispatch(addFeed(res.data?.data || []));
      } catch (err) {
        console.error("Failed to fetch feed:", err);
        dispatch(addFeed([]));
      }
    };
    // Fetch feed only if the user is loaded and the feed is empty
    if (loggedInUser && feed.length === 0) {
      getFeed();
    }
  }, [loggedInUser, feed.length, dispatch]);

  // --- INTERACTION HANDLERS ---

  const handleNextUser = () => {
    // Simply move to the next user in the feed array
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const handleConnect = async (targetUserId) => {
    try {
      // TODO: This is where you will make the API call to your backend
      // to create a connection request.
      console.log(`Sending connection request to ${targetUserId}`);
      // await axios.post(`${BASE_URL}/request/send`, { toUserId: targetUserId }, { withCredentials: true });
      
      // After successfully sending the request, move to the next user
      handleNextUser();

    } catch (err) {
      console.error("Failed to send connection request:", err);
      // You might want to show an error to the user here
    }
  };

  // --- RENDER LOGIC ---

  if (feed === null) {
    return <div className="text-center p-8 text-slate-600">Loading your feed...</div>;
  }

  // Check if we have viewed all the users in the feed
  if (currentIndex >= feed.length) {
    return (
      <div className="text-center p-12 bg-white/20 backdrop-blur-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-slate-800">That's everyone for now!</h2>
        <p className="text-slate-600 mt-2">Come back later to see new developers.</p>
      </div>
    );
  }

  // Get the current user to display from the feed array
  const currentUser = feed[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      
      {/* The Main User Card */}
      <div className="w-full max-w-sm bg-white/20 backdrop-filter backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-6 text-center text-slate-800">
        <Link to={`/users/${currentUser._id}`}>
          <img 
            className="w-32 h-32 rounded-full ring-4 ring-pink-500/50 mx-auto -mt-20 object-cover"
            src={currentUser.photoUrl || `https://ui-avatars.com/api/?name=${currentUser.firstName}+${currentUser.lastName}`} 
            alt="User profile" 
          />
        </Link>
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-slate-900">{currentUser.firstName} {currentUser.lastName}</h1>
          <p className="text-lg text-slate-600 mt-2 px-4 min-h-[56px] line-clamp-2">
            {currentUser.about || "A passionate developer looking to connect!"}
          </p>
        </div>
      </div>

      {/* The Action Buttons */}
      <div className="flex items-center gap-10">
        <button onClick={handleNextUser} className="btn-feed-action bg-slate-900/5 hover:bg-slate-900/10 text-slate-600">
          <HiX size={40} />
        </button>
        <button onClick={() => handleConnect(currentUser._id)} className="btn-feed-action bg-pink-500/80 hover:bg-pink-500 text-white">
          <HiCheck size={40} />
        </button>
      </div>

    </div>
  );
};

export default Feed;