import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store) => store.user);

    const fetchUser = async () => {
        if(userData) return;
        try {
            const user = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true
            })
            dispatch(addUser(user.data))

        } catch (err) {
            if(err.status === 401) {
                navigate("/login")
            }
            console.error(err);
        }
    }; 

    useEffect(() => {
        fetchUser();
    }, [])


    return (
    <div>
        <NavBar />
        <Outlet />
        <Footer />
    </div>
    )
};
export default Body;