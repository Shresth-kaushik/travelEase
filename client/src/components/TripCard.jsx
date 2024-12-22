import React from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';

const TripCard = ({ trip }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={trip.image} alt={trip.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{trip.name}</h3>
        <p className="text-gray-600 mb-4">{trip.description.substring(0, 100)}...</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1 text-gray-500" />
            <span className="text-sm text-gray-600">
              {new Date(trip.startDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1 text-gray-500" />
            <span className="text-sm text-gray-600">{trip.location}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-gray-500" />
            <span className="text-sm text-gray-600">{trip.availableSlots} slots left</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1 text-purple-500" />
            <span className="text-lg font-semibold text-purple-600">₹{trip.price}</span>
          </div>
        </div>
        <Link href={`/trips/${trip._id}`}>
          <a className="mt-4 block w-full text-center bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
            View Details
          </a>
        </Link>
      </div>
    </div>
  );
};

export default TripCard;

