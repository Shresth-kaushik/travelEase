import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Plus, UserCircle, LogOut, HomeIcon, Calendar } from 'lucide-react';
import { Routes, Route, Link } from 'react-router-dom';
import TripForm from './TripForm';
import TripDashboard from './TripDashboard';
import ProfileUpdate from './ProfileUpdate';
import EditTripForm from './EditTripForm';

function OrganizerDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { user, logout } = useAuth();

  const renderContent = () => {
    switch(activeSection) {
      case 'profile':
        return <ProfileUpdate />;
      case 'newTrip':
        return <TripForm />;
      default:
        return <TripDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold text-purple-900">
              TravelEase
            </Link>
            <nav className="flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-purple-900">
                Home
              </Link>
              <Link to="/upcoming-trips" className="text-gray-600 hover:text-purple-900">
                Upcoming Trips
              </Link>
              <Link to="/dashboard" className="text-gray-600 hover:text-purple-900">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 bg-purple-900 text-white rounded-full hover:bg-purple-800 transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-purple-900">Welcome !</h2>
            <p className="text-sm text-gray-600">Organizer Panel</p>
          </div>
          
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className={`w-full flex items-center p-2 rounded-md ${
                    activeSection === 'dashboard' ? 'bg-purple-100 text-purple-900' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('newTrip')}
                  className={`w-full flex items-center p-2 rounded-md ${
                    activeSection === 'newTrip' ? 'bg-purple-100 text-purple-900' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Trip
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('profile')}
                  className={`w-full flex items-center p-2 rounded-md ${
                    activeSection === 'profile' ? 'bg-purple-100 text-purple-900' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <UserCircle className="mr-2 h-4 w-4" />
                  Profile
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <Routes>
          <Route path="/" element={<TripDashboard />} />
          <Route path="/new-trip" element={<TripForm />} />
          <Route path="/profile" element={<ProfileUpdate />} />
          <Route path="/edit-trip/:tripId" element={<EditTripForm />} />
        </Routes>
        </main>
      </div>
    </div>
  );
}

export default OrganizerDashboard;

