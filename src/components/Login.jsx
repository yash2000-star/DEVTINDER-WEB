import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/contants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try{
    const res = await axios.post(BASE_URL + "/login", {
      emailId, 
      password,
    }, {withCredentials: true}
  );
  dispatch(addUser(res.data));
   return navigate("/")
  } catch (err) {
    setError(err?.response?.data || "Something went wrong")
    }
  };

  const handleSignUp = async () => {
    try {

     const res = await axios.post(BASE_URL + "/signup", { firstName, lastName, emailId, password}, { withCredentials: true})
     dispatch(addUser(res.data.data));
     return navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login" : "SignUp"}</h2>

          {!isLoginForm && (
            <>
            <fieldset className="fieldset">
            <legend className="fieldset-legend my-2">First Name</legend>
            <input
              type="text"
              className="input w-full my-1"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend my-2">Last Name</legend>
            <input
              type="text"
              className="input w-full my-1"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </fieldset>
          </>
          )}
          

          <fieldset className="fieldset">
            <legend className="fieldset-legend my-2">Email ID</legend>
            <input
              type="text"
              className="input w-full my-1"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend my-2">Password</legend>
            <input
              type="text"
              className="input w-full my-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
         <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm? handleLogin : handleSignUp}>
              {isLoginForm ? "Login" : "SignUp"}
            </button>
          </div>
                   <p className="m-auto cursor-pointer py-2" onClick={() => setIsLoginForm((value) => !value)}>{isLoginForm? "New User? Signup here" : "Existing User? Login Here"}</p>

        </div>
      </div>
    </div>
  );
};

export default Login;
