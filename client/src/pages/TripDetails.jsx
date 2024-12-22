import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TripDetails() {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/trips/${id}`);
        setTrip(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trip details:', error);
        setError('Failed to load trip details. Please try again later.');
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  if (!trip) {
    return <div className="text-center mt-8">Trip not found.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold mb-4">{trip.name}</h1>
      <img src={trip.image} alt={trip.name} className="w-full h-64 object-cover rounded-lg mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Trip Details</h2>
          <p className="mb-4">{trip.description}</p>
          <p className="mb-2"><span className="font-semibold">Dates:</span> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</p>
          <p className="mb-2"><span className="font-semibold">Price:</span> ${trip.price}</p>
          <p className="mb-2"><span className="font-semibold">Available Slots:</span> {trip.availableSlots}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Cancellation Policy</h2>
          <p>{trip.cancellationPolicy}</p>
        </div>
      </div>
      <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-300">Book Now</button>
    </div>
  );
}

export default TripDetails;

