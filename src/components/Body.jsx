import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { addUser } from "../utils/userSlice";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedInUser = useSelector((store) => store.user);

    useEffect(() => {
        const fetchUserOnLoad = async () => {
            if (loggedInUser) return;
            try {
                const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
                if (res.data) {
                    dispatch(addUser(res.data));
                }
            } catch (err) {
                if (err?.response?.status === 401 && window.location.pathname !== '/login') {
                    navigate("/login");
                }
                console.error("No active session or error fetching user:", err.message);
            }
        };
        fetchUserOnLoad();
    }, [dispatch, navigate, loggedInUser]);

    return (
        <div 
            className="min-h-screen w-full bg-cover bg-center bg-fixed font-sans text-white flex flex-col"
            // --- THIS IS THE GUARANTEED CORRECT LINE ---
            style={{ backgroundImage: "url('/Profile-page-image.webp')" }}
        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <NavBar />
            </div>

            <main className="flex-grow flex items-center justify-center p-4">
                <Outlet />
            </main>

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Footer />
            </div>
        </div>
    );
};

export default Body;