import React from 'react';
import { X, Calendar, MapPin, Users, DollarSign } from 'lucide-react';

function TripModal({ trip, onClose }) {
  if (!trip) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="relative h-72">
          <img 
            src={trip.image} 
            alt={trip.name} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <h2 className="text-3xl font-bold text-purple-900 mb-4">{trip.name}</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 text-purple-500 mr-2" />
              <span>
                {new Date(trip.startDate).toLocaleDateString()} - 
                {new Date(trip.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 text-purple-500 mr-2" />
              <span>{trip.location || 'Location TBA'}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="w-5 h-5 text-purple-500 mr-2" />
              <span>{trip.availableSlots} spots left</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 text-purple-500 mr-2" />
              <span className="text-2xl font-bold text-purple-900">${trip.price}</span>
            </div>
          </div>
          
          <div className="prose max-w-none mb-6">
            <h3 className="text-xl font-semibold text-purple-900 mb-2">Trip Description</h3>
            <p className="text-gray-600 whitespace-pre-line">{trip.description}</p>
          </div>
          
          {trip.cancellationPolicy && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-purple-900 mb-2">Cancellation Policy</h3>
              <p className="text-gray-600">{trip.cancellationPolicy}</p>
            </div>
          )}
          
          <button className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripModal;

