import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import UserBookings from './UserBookings';

function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to load user data. Please try again later.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  if (loading) return <div>Loading user dashboard...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Traveller Dashboard</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {user.username}!</h2>
        {userData && (
          <div>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Member since:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
        <UserBookings />
      </div>
    </div>
  );
}

export default UserDashboard;

