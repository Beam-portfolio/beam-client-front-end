import React from 'react';
import { Icon } from '@iconify/react';

const ServicesSection = ({ services }) => {
  console.log(services[0]?.color);

  return (
    <section id="services" className="w-full py-16 px-5 bg-white pb-0">
      <h2 className="text-2xl md:text-3xl font-bold text-[#222357] mb-8 px-5">Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-5">
        {services && services?.length > 0 ?
          services.map((service) => (
            <div
              key={service.title}
              className={`relative group rounded-2xl shadow-xl bg-gradient-to-br p-6 min-h-[160px] flex flex-col justify-between transition-transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer ${service.highlight ? 'scale-105 border-4 border-blue-400' : ''}`}
              style={{ background: `linear-gradient(to bottom right, ${service?.color?.from}, ${service?.color?.to})` }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl"> <Icon style={{
  
                }} icon={service.icon} /> </span>
                <span className="text-xl font-semibold text-[#222357]">{service.title}</span>
              </div>
              {service.desc && <p className="text-gray-700 text-sm mb-2">{service.desc}</p>}
              {service.badge && (
                <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition">{service.badge}</span>
              )}
            </div>
          ))
          : <p>No services found</p>
        }
      </div>
    </section>
  );
};

export default ServicesSection;
