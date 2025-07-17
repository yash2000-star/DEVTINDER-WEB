import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contants";
import { FaFacebook, FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

   return (
    <div className="min-h-screen bg-soft-gradient flex items-center justify-center p-4">
      
      <div className="card w-full max-w-md bg-base-100 shadow-lg">
        <div className="card-body p-8">
          
          <h2 className="card-title text-4xl font-bold justify-center mb-6">
            {isLoginForm ? "Log In" : "Sign Up"}
          </h2>
          
          <form className="space-y-4">
            {!isLoginForm && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label"><span className="label-text">First Name</span></label>
                  <input type="text" placeholder="First Name" className="input input-bordered w-full" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text">Last Name</span></label>
                  <input type="text" placeholder="Last Name" className="input input-bordered w-full" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
            )}

            <div className="form-control">
              <label className="label"><span className="label-text">Email Address</span></label>
              <input type="email" placeholder="your-email@example.com" className="input input-bordered w-full" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
            </div>
            
            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input type="password" placeholder="••••••••" className="input input-bordered w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            {error && <p className="text-error text-center text-sm">{error}</p>}
            
            <div className="form-control pt-4">
              <button type="button" className="btn btn-primary capitalize text-lg" onClick={isLoginForm ? handleLogin : handleSignUp}>
                {isLoginForm ? "Log In" : "Sign Up"}
              </button>
            </div>
          </form>
          
          <p className="text-center text-sm mt-6">
            {isLoginForm ? "Don't have an account?" : "Already have an account?"}{' '}
            <button className="link link-primary font-bold" onClick={() => { setIsLoginForm((prev) => !prev); setError(""); }}>
              {isLoginForm ? "Sign Up" : "Log In"}
            </button>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Login;