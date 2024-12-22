import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import UpcomingTrips from './pages/UpcomingTrips';
import TripDetails from './components/TripDetails';
import Footer from './components/Footer';
// import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './components/UserDashboard';
import OrganizerDashboard from './components/OrganizerDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import RoleBasedRoute from './components/RoleBasedRoute';
// import HomePage from './pages/HomePage'; // Import HomePage
// import Home from './pages/Home'; // Import Home

// Router guard component
function RouterGuard({ children }) {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated && 
        location.pathname !== '/login' && 
        location.pathname !== '/register' && 
        location.pathname !== '/' && 
        location.pathname !== '/upcoming-trips') {
      navigate('/login');
    } else if (isAuthenticated) {
      if (user.role === 'organizer' && !location.pathname.startsWith('/organizer-dashboard')) {
        navigate('/organizer-dashboard');
      } else if (user.role === 'traveller' && location.pathname === '/login') {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, navigate, location, user]);

  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <RouterGuard>
          <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 pt-24">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upcoming-trips" element={<UpcomingTrips />} />
                <Route path="/trip/:id" element={<TripDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <RoleBasedRoute allowedRoles={['traveller']}>
                      <UserDashboard />
                    </RoleBasedRoute>
                  } 
                />
                <Route 
                  path="/organizer-dashboard/*" 
                  element={
                    <RoleBasedRoute allowedRoles={['organizer']}>
                      <OrganizerDashboard />
                    </RoleBasedRoute>
                  }
                >
                  <Route path="home" element={<Home />} />
                  <Route path="upcoming-trips" element={<UpcomingTrips />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </RouterGuard>
      </Router>
    </AuthProvider>
  );
}

export default App;

