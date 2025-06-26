import React, { useEffect } from 'react';
import { FaEnvelope, FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { fetchSettings } from '../redux/slices/settings';
import SplashScreen from './SplashScreen';

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};



const Footer = () => {
  const location = useLocation();

  const dispatch = useDispatch()
  const { settings, loading: settingLoading } = useSelector((state) => state.settings)
  const { services, loading: servicesLoading } = useSelector(state => state.services)
  useEffect(() => {
    dispatch(fetchSettings())
  }, [dispatch])

  if (settingLoading || servicesLoading) {
    return <SplashScreen />
  }

  return (
    <footer className="w-full bg-gradient-to-r from-[#0f0f26] to-[#18192b] text-white pt-12 pb-4 px-4 border-t border-blue-900/30">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-8">
        {/* Contact Us */}
        <div>
          <h4 className="font-bold mb-3">Contact Us</h4>
          <div className="text-sm text-gray-300 mb-2">
            {settings?.address}<br />
            <span className="block mt-2">{settings?.phone}</span>
            <span className="block">{settings?.email}</span>
          </div>
        </div>
        {/* Services */}
        <div>
          <h4 className="font-bold mb-3">Services</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            {services?.length > 0 && services.map((service) => (
              <li key={service.id}>{service.title}</li>
            ))}
          </ul>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="font-bold mb-3">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <NavLink to="/" className={({ isActive }) => `hover:text-blue-400 transition ${isActive ? 'text-blue-400 font-bold' : ''}`} end>Home</NavLink>
            </li>
            <li>
              <a
                href="#services"
                className="hover:text-blue-400 transition"
                onClick={e => {
                  e.preventDefault();
                  if (location.pathname !== '/') {
                    window.location.href = '/#services';
                  } else {
                    scrollToSection('services');
                  }
                }}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#portfolio"
                className="hover:text-blue-400 transition"
                onClick={e => {
                  e.preventDefault();
                  if (location.pathname !== '/') {
                    window.location.href = '/#portfolio';
                  } else {
                    scrollToSection('portfolio');
                  }
                }}
              >
                Portfolio
              </a>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `hover:text-blue-400 transition ${isActive ? 'text-blue-400 font-bold' : ''}`}>Contact</NavLink>
            </li>
          </ul>
        </div>
        {/* About & Social */}
        <div>
          <h4 className="font-bold mb-3">About Beam</h4>
          <p className="text-sm text-gray-300 mb-4">{settings?.about}</p>
          <div className="flex gap-4 text-xl">
            <a href={settings?.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition" aria-label="linkedin"><FaLinkedin /></a>
            <a href={`mailto:${settings?.email}`} className="hover:text-blue-400 transition" aria-label="Email"><FaEnvelope /></a>
            <a href={settings?.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition" aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href={settings?.github} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition" aria-label="GitHub"><FaGithub /></a>
          </div>
        </div>
      </div>
      {/* Newsletter */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-blue-900/30 pt-6">
        <div className="font-semibold mb-2 md:mb-0">Subscribe to Newsletter</div>
        <form className="flex w-full md:w-auto">
          <input type="email" placeholder="Your email" className="rounded-l-md px-4 py-2 text-gray-900 focus:outline-none" />
          <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-r-md font-semibold transition">Subscribe</button>
        </form>
      </div>
      {/* Rights */}
      <div className="mt-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Beam. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
