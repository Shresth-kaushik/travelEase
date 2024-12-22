import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

function AddToCart({ tripId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const handleAddToCart = async () => {
    setLoading(true);
    setError(null);

    try {
      await axios.post('http://localhost:5001/api/bookings', 
        { tripId },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      // Show success message or update cart count
      alert('Trip added to cart successfully!');
    } catch (error) {
      setError('Failed to add trip to cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <button 
        onClick={handleAddToCart} 
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}

export default AddToCart;

