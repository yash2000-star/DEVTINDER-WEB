import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { name: "Profile", path: "/profile" },
    { name: "Connections", path: "/connections" },
    { name: "Requests", path: "/requests" },
  ];

  if (!user) return null; 

  return (
    <header className="flex justify-between items-center py-5">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-3xl font-bold tracking-wider text-slate-900">DevTinder</Link>
        <nav className="hidden md:flex items-center gap-6 text-lg text-slate-600">
          {navLinks.map((link) => (
            <Link key={link.path} to={link.path} className={`transition-colors hover:text-slate-900 ${location.pathname.startsWith(link.path) ? "text-pink-600 font-semibold" : ""}`}>
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="relative">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-12 h-12 rounded-full ring-2 ring-pink-500/50 focus:outline-none focus:ring-pink-500">
        <img src={user.photoUrl || '/default-avatar.png'} alt="User avatar" className="w-full h-full rounded-full object-cover"/>
        </button>
        
        {isDropdownOpen && (
          <ul className="absolute right-0 mt-3 z-10 p-2 shadow-2xl menu w-52 bg-white/40 backdrop-blur-lg border border-white/50 rounded-box">
            <li className="p-2 text-slate-800 font-semibold">Welcome, {user.firstName}</li>
            <div className="h-[1px] bg-slate-900/10 my-1"></div>
            <li><Link to="/profile" className="menu-item-light">Profile</Link></li>
            <li><Link to="/connections" className="menu-item-light">Connections</Link></li>
            <li><Link to="/requests" className="menu-item-light">Requests</Link></li>
            <li><Link to="/premium" className="menu-item-light">Premium</Link></li>
            <div className="h-[1px] bg-slate-900/10 my-1"></div>
            <li><button onClick={handleLogout} className="menu-item-light text-red-600 w-full text-left">Logout</button></li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default NavBar;