import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl,, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age);
    const [gender, setGender] = useState(user.gender);
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);

    const saveProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {firstName, lastName, photoUrl, age, gender, about}, {withCredentials: true})
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false)
            }, 3000);

        } catch (err) {
            setError(err.response.data); // check 
        }
    }

      
    return (
       <>
        <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>

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

          <fieldset className="fieldset">
            <legend className="fieldset-legend my-2">Photo URL</legend>
            <input
              type="text"
              className="input w-full my-1"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend my-2">Age</legend>
            <input
              type="text"
              className="input w-full my-1"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend my-2">Gender</legend>
            <select className="select w-full mt-1" 
            value={gender} 
            onChange={(e) => setGender(e.target.value)}
            >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
            </select>
          </fieldset>

          <fieldset className="fieldset">
            <legend className="fieldset-legend my-2">About</legend>
            <input
              type="text"
              className="input w-full my-1"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </fieldset>

         <p className="text-red-500">ERROR Message is here!!</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
          </div>
        </div>
      </div>
    </div>
    <UserCard user={{firstName, lastName, photoUrl, age, gender, about }} />
    </div>
   {showToast && ( <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile saved successfully.</span>
  </div>
</div>
)}
    </>

    )
};

export default EditProfile;