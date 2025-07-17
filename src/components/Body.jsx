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
            if(err?.response?.status === 401) {
                navigate("/login")
            }
            console.error(err);
        }
    }; 

    useEffect(() => {
        fetchUser();
    }, [])


   return (
        <div className="min-h-screen bg-soft-gradient flex flex-col items-center py-4 sm:py-6 md:py-8 font-sans">
            
            <div className="card w-full max-w-5xl bg-base-100 shadow-xl flex-grow">
                <div className="card-body p-4 md:p-6 flex flex-col">
                    
                    <NavBar />
                    
                    <main className="flex-grow mt-4">
                        <Outlet />
                    </main>
                    <Footer />

                </div>
            </div>
        </div>
    );
};

export default Body;