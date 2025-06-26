import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 text-center relative bg-[#18192b]">
      <div className="absolute inset-0 w-full h-full bg-[url('/beamll404.png')] bg-cover bg-center opacity-20 z-0"></div>
      <div>
      <h1 className="text-6xl md:text-7xl font-extrabold text-white drop-shadow mb-4">404</h1>
      <p className="text-2xl md:text-3xl font-semibold text-white mb-4 drop-shadow">Page Not Found</p>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-12">
        <p className="text-white/90 mb-8 max-w-xl">Sorry, the page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="bg-gradient-to-br from-blue-600 to-blue-900 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform">Go Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
