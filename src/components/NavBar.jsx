// src/components/NavBar.jsx

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 

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
    // You can add more links like 'Jobs' or 'Messaging' here in the future
  ];

  if (!user) return null; 
  return (
    <header className="flex justify-between items-center border-b border-base-200 pb-4">
      
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold text-primary">
          DevTinder
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`pb-1 text-lg hover:text-primary transition-colors ${
                location.pathname.startsWith(link.path)
                  ? "text-primary font-semibold border-b-2 border-primary"
                  : "text-base-content/70"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={user.photoUrl || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
              alt="User avatar"
            />
          </div>
        </label>
        
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          <li className="p-2">
            <p className="font-semibold">Welcome,{user.firstName}</p>
          </li>
          <div className="divider my-0"></div>
          <li>
            <Link to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link to="/connections">Connections</Link>
          </li>
          <li>
            <Link to="/requests">Requests</Link>
          </li>
          <div className="divider my-0"></div>
          <li>
            <button onClick={handleLogout} className="text-error">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default NavBar;