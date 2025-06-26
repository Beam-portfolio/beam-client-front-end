import React from 'react';
import './SplashScreen.css'

const SplashScreen = () => {
  return (
    <div
      className=" inset-0 h-[50dvh] flex items-center justify-center z-[9999] bg-cover bg-center bg-gradient-to-br from-[#0f0f26] to-[#000]"
    >
      <div className="relative flex items-center justify-center"> 
        <div className="relative flex items-center justify-center">
        <span className="loader"></span>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
