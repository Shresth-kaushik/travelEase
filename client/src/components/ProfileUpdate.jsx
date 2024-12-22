import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ProfileUpdate() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    bio: user?.bio || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle profile update logic here
    console.log('Profile update:', formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Profile Settings</h2>
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img 
            src={formData.avatar || 'https://via.placeholder.com/150'} 
            alt={formData.username}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
          <input
            id="avatar"
            name="avatar"
            type="url"
            value={formData.avatar}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
            placeholder="Tell us about yourself..."
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileUpdate;

