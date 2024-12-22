import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, MapPin, DollarSign, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';

function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/bookings', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings. Please try again.');
        setLoading(false);
      }
    };

    if (token) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [token]);

  const handleCancelBooking = async (bookingId) => {
    try {
      // First, calculate potential refund
      const refundResponse = await axios.get(
        `http://localhost:5001/api/payments/calculate-refund/${bookingId}`,
        { headers: { 'Authorization': `Bearer ${token}` } }
      );

      const { refundAmount, refundPercentage } = refundResponse.data;

      // Confirm cancellation with user
      const confirmMessage = refundPercentage > 0
        ? `You will receive a ${refundPercentage}% refund (₹${refundAmount}). Do you want to proceed with cancellation?`
        : 'This booking is not eligible for a refund. Do you still want to cancel?';

      if (window.confirm(confirmMessage)) {
        const response = await axios.post(
          `http://localhost:5001/api/bookings/cancel/${bookingId}`,
          {},
          { headers: { 'Authorization': `Bearer ${token}` } }
        );

        setBookings(bookings.map(booking => 
          booking._id === bookingId 
            ? { 
                ...booking, 
                status: 'cancelled',
                refundAmount,
                refundPercentage
              }
            : booking
        ));

        toast.success('Booking cancelled successfully');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error(error.response?.data?.message || 'Failed to cancel booking. Please try again.');
    }
  };

  if (loading) return <div>Loading your bookings...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      {bookings.length === 0 ? (
        <p>You haven't made any bookings yet.</p>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">{booking.trip.name}</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                <span>{new Date(booking.trip.startDate).toLocaleDateString()} - {new Date(booking.trip.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-gray-500" />
                <span>{booking.trip.location || 'Location TBA'}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-gray-500" />
                <span>₹{booking.totalAmount}</span>
              </div>
              <div className="flex items-center">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>
            </div>
            {booking.status === 'confirmed' && (
              <div className="mt-4">
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                >
                  Cancel Booking
                </button>
                <p className="text-sm text-gray-500 mt-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  Cancellation policy applies. Please review before cancelling.
                </p>
              </div>
            )}
            {booking.status === 'cancelled' && booking.refundAmount > 0 && (
              <p className="text-sm text-gray-500 mt-2">
                Refund processed: ₹{booking.refundAmount} ({booking.refundPercentage}% of the booking amount)
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default UserBookings;

