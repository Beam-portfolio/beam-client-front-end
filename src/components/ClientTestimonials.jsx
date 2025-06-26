import React from 'react';

// const testimonials = [
//   {
//     name: 'Jane Doe',
//     role: 'CEO, Startup X',
//     quote: 'Beam delivered our SaaS MVP in record time. The team is world-class!',
//     logo: '', // Placeholder
//   },
//   {
//     name: 'John Smith',
//     role: 'CTO, Fortune 500',
//     quote: 'Their design sprint and agile process made all the difference for our launch.',
//     logo: '',
//   },
//   {
//     name: 'Sarah Lee',
//     role: 'Founder, Y Combinator',
//     quote: 'Truly stunning web experience. Highly recommend Beam for startups and scaleups.',
//     logo: '',
//   },
// ];

const logos = [
  { name: 'Fortune 500 Companies', icon: '🏢' },
  { name: 'Fortune Company', icon: '💼' },
  { name: 'Y Combinator', icon: '🚀' },
];

const ClientTestimonials = ({testimonials}) => {
  return (
    <section id='contact' className="w-full py-16 px-10 bg-white">
      <div className="px-5 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#222357] mb-4">Client Testimonials</h2>
      </div>
      <div className="flex gap-8 overflow-x-auto px-8 mb-6">
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
