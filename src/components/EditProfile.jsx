// src/components/EditProfile.jsx

import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || ""); 
    const [about, setAbout] = useState(user.about);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);
    
    const saveProfile = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName, 
                lastName, 
                photoUrl: user.photoUrl, 
                age: Number(age), 
                gender, 
                about 
            }, { withCredentials: true });
            dispatch(addUser(res?.data?.data));
            setError(""); 
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (err) {
            setError(err?.response?.data || "Failed to save profile.");
        }
    };

    return (
        <>
            <form className="space-y-4 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">First Name</span></label>
                        <input type="text" className="input input-bordered w-full" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Last Name</span></label>
                        <input type="text" className="input input-bordered w-full" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">Profile Photo</span></label>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs" />
                    <p className="text-xs text-base-content/60 mt-1">Note: Photo upload is for UI demo purposes.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label"><span className="label-text">Age</span></label>
                        <input type="number" className="input input-bordered w-full" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="form-control">
                        <label className="label"><span className="label-text">Gender</span></label>
                        <select className="select select-bordered w-full" value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="" disabled>Select...</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>

                <div className="form-control">
                    <label className="label"><span className="label-text">About</span></label>
                    <textarea className="textarea textarea-bordered h-24" placeholder="Tell us about yourself" value={about} onChange={(e) => setAbout(e.target.value)} />
                </div>

                {error && <p className="text-error text-center text-sm">{error}</p>}

                <div className="flex justify-end pt-4">
                    <button type="button" className="btn btn-primary" onClick={saveProfile}>
                        Save Profile
                    </button>
                </div>
            </form>

            {showToast && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-success">
                        <span>Profile saved successfully!</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditProfile;