import React, { useState } from 'react';
import { FaEnvelope, FaHome, FaProjectDiagram, FaSuitcase, FaUsers, FaBars, FaTimes } from 'react-icons/fa';
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
  const [menuOpen, setMenuOpen] = useState(false);

  // Prevent scroll when menu is open
  React.useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className="w-full flex items-center justify-between px-4 md:px-8 py-4 bg-gradient-to-r from-[#0f0f26] to-[#000] shadow-lg relative z-50">
      <div className="flex items-center gap-2">
        <span onClick={() => window.open('/')} className="text-3xl font-extrabold text-white tracking-tight cursor-pointer">Beam</span>
        <span className="w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full ml-2 animate-pulse"></span>
      </div>
      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 text-white font-medium text-lg">
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
                    window.location.href = '/' + link.to;
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
      <button className="hidden md:block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full shadow-lg font-semibold text-lg animate-float hover:scale-105 transition-transform duration-300">
        Get a Free Audit
      </button>
      {/* Hamburger Button */}
      <button
        className="md:hidden text-white text-2xl focus:outline-none z-50"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>
      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-80 z-40 flex flex-col transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'} pointer-events-${menuOpen ? 'auto' : 'none'}`}
        style={{ top: 0, right: 0 }}
        aria-hidden={!menuOpen}
      >
        <div className="flex flex-col items-end p-6">
          <button
            className="text-white text-3xl mb-4 focus:outline-none"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <FaTimes />
          </button>
        </div>
        <nav className="flex flex-col gap-6 text-white font-medium text-xl px-8">
          {navLinks.map(link =>
            link.type === 'route' ? (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 hover:text-blue-400 transition ${isActive ? 'text-blue-400 font-bold' : ''}`
                }
                onClick={() => setMenuOpen(false)}
                end={link.to === '/'}
              >
                {link.icon} {link.name}
              </NavLink>
            ) : (
              <a
                key={link.name}
                href={link.to}
                className="flex items-center gap-2 hover:text-blue-400 transition"
                onClick={e => {
                  e.preventDefault();
                  const id = link.to.replace('#', '');
                  setMenuOpen(false);
                  if (location.pathname !== '/') {
                    window.location.href = '/' + link.to;
                  } else {
                    scrollToSection(id);
                  }
                }}
              >
                {link.icon} {link.name}
              </a>
            )
          )}
          <button className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-lg font-semibold text-lg animate-float hover:scale-105 transition-transform duration-300">
            Get a Free Audit
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
