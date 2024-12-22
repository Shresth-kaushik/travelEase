import React from 'react';
import HomePage from '../pages/Home';

function OrganizerHomePage() {
  return (
    <div className="organizer-view">
      <h2 className="text-2xl font-bold mb-4">Home Page Preview</h2>
      <div className="border border-gray-200 rounded-lg p-4">
        <HomePage />
      </div>
    </div>
  );
}

export default OrganizerHomePage;

