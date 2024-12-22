import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
      <p className="text-xl mb-8">You don't have permission to access this page.</p>
      <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Go to Home
      </Link>
    </div>
  );
}

export default Unauthorized;

