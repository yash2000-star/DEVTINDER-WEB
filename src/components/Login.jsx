import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contants";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from 'react-icons/hi';
// We import the colored versions of the icons now
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';

const Login = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearForm = () => {
    setEmailId("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${BASE_URL}/login`, { emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Login failed. Please check your credentials.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const res = await axios.post(`${BASE_URL}/signup`, { firstName, lastName, emailId, password }, { withCredentials: true });
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Sign-up failed. Please try again.");
    }
  };

  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
    clearForm();
  };

  return (
    // UPDATED: Using your new background image
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center" 
      style={{ backgroundImage: "url('/Login-Signup-background-image.png')" }}
    >
      {/* UPDATED: Light-themed "Glass" Card */}
      <div className="w-full max-w-md p-8 md:p-10 space-y-6 bg-white/20 bg-clip-padding backdrop-filter backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg">
        
        {/* Text color is now dark for readability on the light background */}
        <h2 className="text-4xl font-bold text-center text-slate-800">
          {isLoginForm ? "Log In" : "Sign Up"}
        </h2>
        
        <form onSubmit={isLoginForm ? handleLogin : handleSignUp} className="space-y-5">
          {!isLoginForm && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full">
                <HiOutlineUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                <input type="text" placeholder="First Name" className="input-field-light pl-10" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="relative w-full">
                <HiOutlineUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                <input type="text" placeholder="Last Name" className="input-field-light pl-10" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </div>
          )}

          <div className="relative">
            <HiOutlineMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
            <input type="email" placeholder="Enter your Email" className="input-field-light pl-10" value={emailId} onChange={(e) => setEmailId(e.target.value)} required />
          </div>
          
          <div className="relative">
            <HiOutlineLockClosed className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
            <input type="password" placeholder="Enter your Password" className="input-field-light pl-10" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          {!isLoginForm && (
            <div className="relative">
              <HiOutlineLockClosed className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
              <input type="password" placeholder="Confirm Password" className="input-field-light pl-10" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          )}

          {isLoginForm && (
            <div className="flex items-center justify-between text-sm text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="checkbox checkbox-sm border-gray-400 checked:bg-pink-400" />
                    <span>Remember Me</span>
                </label>
                <a href="#" className="font-semibold text-purple-600 hover:text-purple-800 transition-colors">Forgot Password?</a>
            </div>
          )}

          {error && <p className="text-red-500 bg-red-100/50 p-2 rounded-md text-center text-sm">{error}</p>}
          
          <div className="pt-2">
            <button type="submit" className="btn-primary-light">
              {isLoginForm ? "LOGIN" : "REGISTER"}
            </button>
          </div>
        </form>
        
        <div className="divider text-slate-500">or</div>
        
        <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-slate-700">{isLoginForm ? "Sign in with" : "Sign up with"}</p>
            <div className="flex justify-center gap-4">
                {/* UPDATED: Social buttons with specific colors */}
                <button type="button" className="social-btn-light"><FcGoogle size={24} /></button>
                <button type="button" className="social-btn-light"><FaFacebook size={24} className="text-[#1877F2]" /></button>
            </div>
        </div>
        
        <p className="text-center text-sm mt-6 text-slate-700">
          {isLoginForm ? "Don't have an account?" : "Already have an account?"}{' '}
          <button className="font-bold text-purple-600 hover:underline" onClick={toggleForm}>
            {isLoginForm ? "Sign up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;