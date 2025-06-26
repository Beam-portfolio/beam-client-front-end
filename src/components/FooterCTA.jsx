import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSettings } from '../redux/slices/settings';

const FooterCTA = () => {
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const dispatch = useDispatch()
  const { settings, loading, error: settingError } = useSelector((state) => state.settings)
  useEffect(() => {
    dispatch(fetchSettings())
  }, [dispatch])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      setIsFooterVisible(scrollY + windowHeight >= docHeight - 2);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if ((!loading && !settings) || settingError) return null
  return (
    <section
      className={`${isFooterVisible ? 'fixed bottom-[21em] left-4' : 'fixed bottom-4 left-4'} max-w-3xl bg-gradient-to-r from-blue-500 to-black rounded-full shadow-xl flex items-center justify-start gap-4 px-3 py-1 text-white text-lg font-semibold`}
      style={{ zIndex: 50 }}
    >
      <span className="flex items-center gap-2 text-xs">Let’s Build Your Web Solution – <a href={`mailto:${settings?.email}`} className="underline hover:text-blue-200">[Book a Call]</a></span>
      <div className="relative">
        {/* Chat Bubble */}
        <span onClick={() => window.open(`https://wa.me/${settings?.whatsapp}`, '_blank')} className="w-8 h-8 bg-white flex items-center justify-center rounded-full shadow-lg animate-pulse cursor-pointer">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
        </span>
      </div>
    </section>
  );
};

export default FooterCTA;
