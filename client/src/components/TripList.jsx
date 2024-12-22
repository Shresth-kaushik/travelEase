import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, MapPin, Users, DollarSign, Trash2, Edit2, User } from 'lucide-react';
import EditTripForm from './EditTripForm';

function TripList() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTrip, setEditingTrip] = useState(null);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/trips?organizer=${user.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setTrips(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to load trips. Please try again.');
        setLoading(false);
      }
    };

    fetchTrips();
  }, [user.id, token]);

  const handleDeleteTrip = async (tripId) => {
    try {
      await axios.delete(`http://localhost:5001/api/trips/${tripId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setTrips(trips.filter(trip => trip._id !== tripId));
    } catch (error) {
      setError('Failed to delete trip. Please try again.');
    }
  };

  const handleUpdateTrip = (updatedTrip) => {
    setTrips(trips.map(trip => 
      trip._id === updatedTrip._id ? updatedTrip : trip
    ));
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-center">
      <p className="text-red-500">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Trip Dashboard</h2>
      {trips.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">You haven't created any trips yet.</p>
          <button 
            onClick={() => window.location.href = '/organizer-dashboard/new-trip'}
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors"
          >
            Create Your First Trip
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trips.map(trip => (
            <div key={trip._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img 
                  src={trip.image} 
                  alt={trip.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => setEditingTrip(trip)}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteTrip(trip._id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{trip.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{trip.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {new Date(trip.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {trip.availableSlots} slots
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {trip.location || 'Location TBD'}
                    </span>
                  </div>
                  <div className="flex items-center text-orange-500 font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {trip.price}
                    </span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-sm">Organized by {trip.organizerName || user.username}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {editingTrip && (
        <EditTripForm
          trip={editingTrip}
          onClose={() => setEditingTrip(null)}
          onUpdate={handleUpdateTrip}
        />
      )}
    </div>
  );
}

export default TripList;

