import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function TripForm({ onAddTrip }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    price: '',
    availableSlots: '',
    cancellationPolicy: '',
    image: ''
  });
  const [error, setError] = useState(null);
  const { user, token } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5001/api/trips', 
        {
          ...formData,
          organizer: user.id,
          organizerName: user.username
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      onAddTrip?.(response.data);
      setFormData({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        price: '',
        availableSlots: '',
        cancellationPolicy: '',
        image: ''
      });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add trip. Please try again.');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Create New Trip</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Trip Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter trip name"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
            placeholder="Enter trip description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label htmlFor="availableSlots" className="block text-sm font-medium text-gray-700 mb-1">Available Slots</label>
            <input
              id="availableSlots"
              name="availableSlots"
              type="number"
              value={formData.availableSlots}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter available slots"
            />
          </div>
        </div>

        <div>
          <label htmlFor="cancellationPolicy" className="block text-sm font-medium text-gray-700 mb-1">Cancellation Policy</label>
          <textarea
            id="cancellationPolicy"
            name="cancellationPolicy"
            value={formData.cancellationPolicy}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter cancellation policy"
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            id="image"
            name="image"
            type="url"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter image URL"
          />
        </div>
        
        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Trip
        </button>
      </form>
    </div>
  );
}

export default TripForm;

