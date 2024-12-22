import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';

function TripDetails() {
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });
  const { id } = useParams();
  const { isAuthenticated, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTripDetails = async () => {
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

    fetchTripDetails();
  }, [id]);

  const handlePaymentInfoChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/trip/${id}` } });
      return;
    }

    try {
      // Create booking
      const bookingResponse = await axios.post('http://localhost:5001/api/bookings', { tripId: id }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      // Process payment
      const paymentResponse = await axios.post('http://localhost:5001/api/payments/process', {
        bookingId: bookingResponse.data._id,
        amount: trip.price,
        paymentMethod: 'credit_card',
        cardLastFour: paymentInfo.cardNumber.slice(-4),
        cardBrand: 'Visa' // This would normally be determined by the payment processor
      }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      alert('Booking successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Booking error:', error);
      setError('Failed to book the trip. Please try again.');
    }
  };

  if (loading) return <div>Loading trip details...</div>;
  if (error) return <div>{error}</div>;
  if (!trip) return <div>Trip not found.</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold mb-4">{trip.name}</h1>
      <img src={trip.image} alt={trip.name} className="w-full h-64 object-cover rounded-lg mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Trip Details</h2>
          <p className="mb-4">{trip.description}</p>
          <div className="space-y-2">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-gray-500" />
              <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-gray-500" />
              <span>{trip.location || 'Location TBA'}</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-gray-500" />
              <span>{trip.availableSlots} slots left</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
              <span className="text-2xl font-bold">${trip.price}</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Booking</h2>
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={handlePaymentInfoChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">Expiration Date</label>
                <input
                  type="text"
                  id="expirationDate"
                  name="expirationDate"
                  value={paymentInfo.expirationDate}
                  onChange={handlePaymentInfoChange}
                  required
                  placeholder="MM/YY"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentInfoChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Cancellation Policy</h2>
        <p>{trip.cancellationPolicy}</p>
      </div>
    </div>
  );
}

export default TripDetails;

