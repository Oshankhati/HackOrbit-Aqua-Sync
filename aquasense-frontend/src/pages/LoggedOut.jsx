import React from 'react';
//import { Link } from 'react-router-dom';

export default function LoggedOut() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-100 via-blue-100 to-blue-200 p-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md border border-blue-100">
        <h1 className="text-4xl font-bold text-blue-700 mb-3 tracking-wide">
          Logged Out
        </h1>
        <p className="text-base text-gray-600 mb-6 font-medium">
          Thank you for using <span className="text-blue-600 font-semibold">AquaSense</span> 💧
        </p>
      </div>
    </div>
  );
}