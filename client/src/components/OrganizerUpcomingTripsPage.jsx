import React from 'react';
import UpcomingTripsPage from '../pages/UpcomingTrips';

function OrganizerUpcomingTripsPage() {
  return (
    <div className="organizer-view">
      <h2 className="text-2xl font-bold mb-4">Upcoming Trips Page Preview</h2>
      <div className="border border-gray-200 rounded-lg p-4">
        <UpcomingTripsPage />
      </div>
    </div>
  );
}

export default OrganizerUpcomingTripsPage;

