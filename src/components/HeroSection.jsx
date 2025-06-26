import React from 'react';

const HeroSection = () => {
  return (
    <section id='hero' className="relative w-full min-h-[70dvh] bg-gradient-to-br from-[#0f0f26] to-[#000] overflow-hidden px-0 pb-0">
      <div className="w-full flex flex-col md:flex-row items-center justify-center px-10 pt-10 pb-4 gap-8 md:gap-0">
        <div className="flex-1 flex flex-col justify-center align-center z-10 max-w-2xl md:pr-12">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
          Web Solutions & Agentic Platforms<br /> <span className="text-blue-400">for Scalable Growth</span>
            <span className="block text-white text-base md:text-2xl mt-2 font-medium ">
              Custom Apps • Machine Learning • LLM Integration
            </span>
          </h3>
          <p className="text-base md:text-xl text-white/80 mb-8 max-w-xl">
            From MVP to enterprise-grade apps, we build fast, secure, and stunning web experiences.
          </p>
          <div className="flex flex-nowrap gap-2 w-full max-w-xs md:max-w-none">
            <button className="flex-1 whitespace-nowrap bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 md:px-6 md:py-3 rounded-full shadow-lg font-semibold text-sm md:text-lg transition">View Case Studies</button>
            <button className="flex-1 whitespace-nowrap bg-white/10 hover:bg-white/20 text-white px-3 py-2 md:px-6 md:py-3 rounded-full border border-white/30 font-semibold text-sm md:text-lg transition">Talk to Our Team</button>
          </div>
        </div>
        <div className="flex-1 flex justify-end items-center z-10 w-full max-w-[540px] ">
          <div className="relative w-full max-w-[500px] h-[340px] md:h-[380px] flex items-center justify-center">
            <video
              src="/vedio4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover shadow-2xl shadow-black shadow-2xl shadow-black	"
              style={{ minHeight: '100%', width: '100%' }}
            />
          </div>
        </div>
      </div>
      <span className="absolute top-8 left-1/2 w-8 h-8 bg-blue-400 rounded-full opacity-60 blur-xl animate-float-slow"></span>
      <span className="absolute bottom-8 right-12 w-6 h-6 bg-purple-400 rounded-full opacity-60 blur-lg animate-float"></span>
      <svg
        className="absolute bottom-0 left-0 w-full h-[100px] z-20"
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          fill="#fff"
          d="M0,60 Q360,100 720,60 T1440,60 L1440,100 L0,100 Z"
        />
      </svg>
    </section>
  );
};

export default HeroSection;
