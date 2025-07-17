// src/pages/Feed.jsx
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/contants";
import { useEffect } from "react";
import { addFeed } from "../utils/feedSlice"; 
import UserCard from "../components/UserCard"; 

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data?.data));
    } catch (err) {
      console.error("Failed to fetch feed:", err);
      dispatch(addFeed([]));
    }
  };

  useEffect(() => {
    if (feed === null) {
      getFeed();
    }
  }, []);

  if (feed === null) {
    return (
      <div className="flex justify-center items-center p-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (feed.length === 0) {
    return (
      <div className="text-center p-12 bg-base-200 rounded-lg">
        <h2 className="text-2xl font-bold">That's everyone for now!</h2>
        <p className="text-base-content/70 mt-2">
          Come back later to see new developers.
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center">
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;