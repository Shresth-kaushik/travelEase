import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, DollarSign, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function TripDetails({ trip, onClose, onBookNow }) {
  if (!trip) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto"
    >
      <div className="min-h-screen px-4 flex items-start justify-center py-12">
        <div className="relative bg-white w-full max-w-4xl rounded-lg shadow-xl">
          <button
            onClick={onClose}
            className="absolute right-0 top-0 m-4 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Close details"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          <div className="relative h-72">
            <img 
              src={trip.image} 
              alt={trip.name} 
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>

          <div className="p-6">
            <h2 className="text-3xl font-bold text-purple-900 mb-4">{trip.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 text-purple-500 mr-2" />
                <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
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

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-purple-900 mb-2">Trip Description</h3>
                <p className="text-gray-600 whitespace-pre-line">{trip.description}</p>
              </div>

              {trip.cancellationPolicy && (
                <div>
                  <h3 className="text-xl font-semibold text-purple-900 mb-2">Cancellation Policy</h3>
                  <p className="text-gray-600">{trip.cancellationPolicy}</p>
                </div>
              )}

              <button 
                onClick={onBookNow}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function TripCard({ trip, onReadMore, onBookNow }) {
  const maxLength = 150;
  const truncatedDescription = trip.description.length > maxLength 
    ? `${trip.description.substring(0, maxLength)}...` 
    : trip.description;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
    >
      <div className="relative h-48">
        <img 
          src={trip.image} 
          alt={trip.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h2 className="text-2xl font-bold mb-2 text-purple-900">{trip.name}</h2>
        <div className="mb-4 flex-grow">
          <p className="text-gray-600">{truncatedDescription}</p>
          {trip.description.length > maxLength && (
            <button
              onClick={() => onReadMore(trip)}
              className="text-purple-600 hover:text-purple-800 mt-2 inline-flex items-center text-sm font-medium"
            >
              Read More
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 text-purple-500 mr-2" />
            <span className="text-sm">
              {new Date(trip.startDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-5 h-5 text-purple-500 mr-2" />
            <span className="text-sm">{trip.location || 'Location TBA'}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 text-purple-500 mr-2" />
            <span className="text-sm">{trip.availableSlots} spots left</span>
          </div>
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-purple-500 mr-2" />
            <span className="text-2xl font-bold text-purple-900">${trip.price}</span>
          </div>
        </div>
        <button 
          onClick={() => onBookNow(trip)}
          className="w-full mt-6 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Book Now
        </button>
      </div>
    </motion.div>
  );
}

function UpcomingTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/trips');
        const upcomingTrips = response.data
          .filter(trip => new Date(trip.startDate) > new Date())
          .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
        setTrips(upcomingTrips);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trips:', error);
        setError('Failed to load trips. Please try again later.');
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  const handleReadMore = (trip) => {
    setSelectedTrip(trip);
  };

  const handleBookNow = (trip) => {
    if (isAuthenticated) {
      // Handle booking logic for authenticated users
      console.log('Booking trip:', trip);
      // You can implement the booking logic or navigation to a booking page here
    } else {
      // Navigate to the register page for unauthenticated users
      navigate('/register', { state: { from: '/upcoming-trips', tripId: trip._id } });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-purple-900">Upcoming Trips</h1>
      {trips.length === 0 ? (
        <p className="text-center text-gray-600">No upcoming trips available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trips.map((trip) => (
            <TripCard 
              key={trip._id} 
              trip={trip} 
              onReadMore={handleReadMore}
              onBookNow={handleBookNow}
            />
          ))}
        </div>
      )}
      
      <AnimatePresence>
        {selectedTrip && (
          <TripDetails 
            trip={selectedTrip} 
            onClose={() => setSelectedTrip(null)} 
            onBookNow={() => handleBookNow(selectedTrip)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default UpcomingTrips;

