import React from 'react';
import { FaEnvelope, FaHome, FaProjectDiagram, FaSuitcase, FaUsers } from 'react-icons/fa';
import { NavLink, useLocation } from 'react-router-dom';

const navLinks = [
  { name: 'Home', to: '/', icon: <FaHome />, type: 'route' },
  { name: 'Services', to: '#services', icon: <FaSuitcase />, type: 'anchor' },
  { name: 'Portfolio', to: '#portfolio', icon: <FaProjectDiagram />, type: 'anchor' },
  { name: 'Process', to: '#process', icon: <FaUsers />, type: 'anchor' },
  { name: 'Contact', to: '/contact', icon: <FaEnvelope />, type: 'route' },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

const Header = () => {
  const location = useLocation();
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-gradient-to-r from-[#0f0f26] to-[#000] shadow-lg ">
      <div className="flex items-center gap-2">
        <span onClick={() => window.open('/')} className="text-3xl font-extrabold text-white tracking-tight">Beam</span>
        <span className="w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full ml-2 animate-pulse"></span>
      </div>
      <nav className="flex gap-8 text-white font-medium text-lg">
        {navLinks.map(link => {
          if (link.type === 'route') {
            return (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 text-sm hover:text-blue-400 cursor-pointer transition ${isActive ? 'text-blue-400 font-bold' : ''}`
                }
                end={link.to === '/'}
              >
                {link.icon} {link.name}
              </NavLink>
            );
          } else {
            return (
              <a
                key={link.name}
                href={link.to}
                className="flex items-center gap-2 text-sm hover:text-blue-400 cursor-pointer transition"
                onClick={e => {
                  e.preventDefault();
                  const id = link.to.replace('#', '');
                  if (location.pathname !== '/') {
                    window.location.href = '/'+link.to;
                  } else {
                    scrollToSection(id);
                  }
                }}
              >
                {link.icon} {link.name}
              </a>
            );
          }
        })}
      </nav>
      <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full shadow-lg font-semibold text-lg animate-float hover:scale-105 transition-transform duration-300">
        Get a Free Audit
      </button>
    </header>
  );
};

export default Header;
