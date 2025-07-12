import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/contants";
import { useEffect } from "react";
import UserCard from "./UserCard";
import axios from "axios";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data?.data));
    } catch (err) {
      //error
    }
  };

  useEffect(() => {
    getFeed();
  }, []);


  return (
    feed && (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]} />
    </div>
    )
  );
};
export default Feed;
