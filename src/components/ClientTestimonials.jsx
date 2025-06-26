import React from 'react';

const ClientTestimonials = ({testimonials}) => {
  return (
    <section id='contact' className="w-full py-16 px-10 bg-white">
      <div className="px-5 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#222357] mb-4">Client Testimonials</h2>
      </div>
      <div className="flex gap-8 overflow-x-auto px-0 md:px-8 mb-6">
        {testimonials.map((t, idx) => (
          <div key={idx} className="min-w-[300px] bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-6 flex flex-col items-center gap-2 animate-marquee">
            {t.avatar ? (
  <img
    src={t.avatar}
    alt={t.name}
    className="w-16 h-16 rounded-full object-cover mb-2 border-2 border-blue-200"
  />
) : (
  <div className="w-16 h-16 bg-gradient-to-tr from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-2">
    {t.name[0]}
  </div>
)}
            <blockquote className="italic text-center text-[#222357] text-lg mb-2">“{t.word}”</blockquote>
            <span className="text-sm font-semibold text-[#222357]">{t.name}</span>
            <span className="text-xs text-gray-500">{t.nickName}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-8 items-center justify-center px-8">
        {/* {logos.map(l => (
          <div key={l.name} className="flex flex-col items-center">
            <span className="text-3xl mb-1">{l.icon}</span>
            <span className="text-xs text-gray-700 font-semibold">{l.name}</span>
          </div>
        ))} */}
      </div>
    </section>
  );
};

export default ClientTestimonials;
