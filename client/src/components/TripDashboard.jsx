import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Plus, LayoutDashboard, User } from 'lucide-react';
import { motion } from 'framer-motion';
import TripList from './TripList';

function TripDashboard() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-2">
          Welcome, {user?.username}!
        </h1>
        <p className="text-gray-600">
          Manage your trips and create new adventures for travelers.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <LayoutDashboard className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">Total Trips</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">0</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">Active Bookings</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">0</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Plus className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-sm text-gray-500">Available Slots</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">0</h3>
        </div>
      </div>

      {/* Empty State */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-md p-12 text-center"
      >
        <div className="max-w-md mx-auto">
          <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <Plus className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Create Your First Trip
          </h2>
          <p className="text-gray-600 mb-8">
            Start by creating your first trip. Add details, set pricing, and manage bookings all in one place.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/organizer-dashboard/new-trip'}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300"
          >
            Create New Trip
          </motion.button>
        </div>
      </motion.div>

      {/* Trip List will be rendered here when trips exist */}
      <TripList />
    </div>
  );
}

export default TripDashboard;

