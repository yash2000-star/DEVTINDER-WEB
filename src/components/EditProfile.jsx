import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/contants';

const EditProfile = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        about: user.about || '',
        photoUrl: user.photoUrl || '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
          console.log("Saving data:", formData);
          onSave(formData); 
        } catch (error) {
          console.error("Failed to update profile:", error);
        } finally {
          setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-xl bg-white/20 backdrop-filter backdrop-blur-2xl border border-white/40 rounded-3xl shadow-2xl p-8 text-slate-800">
            <h2 className="text-3xl font-bold mb-8 text-center text-slate-900">Edit Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6">
                    {/* UPDATED: Using the new light-themed input class */}
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="input-form-light w-full" />
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="input-form-light w-full" />
                </div>
                <input type="text" name="photoUrl" value={formData.photoUrl} onChange={handleChange} placeholder="Photo URL" className="input-form-light w-full" />
                <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About Me / Headline" className="input-form-light w-full min-h-[120px]"></textarea>
                
                <div className="flex justify-end gap-4 pt-4">
                    {/* UPDATED: Using new light-themed button classes */}
                    <button type="button" onClick={onCancel} className="btn-form-secondary-light">Cancel</button>
                    <button type="submit" disabled={isSubmitting} className="btn-form-primary-light">
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;