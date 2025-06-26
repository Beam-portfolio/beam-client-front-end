import React, { useState, useRef, useEffect } from 'react';
import { FaArrowRight, FaBuilding, FaTrophy, FaRunning, FaChevronLeft, FaChevronRight, FaCode, FaChartLine, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { SiYcombinator } from 'react-icons/si';
import ProjectCard from './ProjectCard';
import { fetcher } from '../utils/axios';

const PortfolioShowcase = ({ projects }) => {
  const [selected, setSelected] = useState('All');
  const filtered = selected === 'All' ? projects : projects.filter(p => p?.type?.name === selected);
  const showcaseRef = useRef(null);
  const [types, setTypes] = useState([{ id: '-1', name: 'All' }])

  const scrollShowcase = (dir) => {
    const container = showcaseRef.current;
    if (!container) return;
    const scrollAmount = 260;
    container.scrollBy({ left: dir === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
  };

  useEffect(() => {
    (async function fetchTypes() {
      const types = await fetcher('/types')
      setTypes(([{ id: '-1', name: 'All' }, ...types]));
    }
    )()
  }, [projects])

  return (
    <section id='portfolio' className='py-16 px-6 md:px-12 pb-0'>
      <h2 className="text-2xl md:text-3xl font-bold text-[#222357] mb-4">Portfolio Showcase</h2>
      <div className="w-full  bg-white  flex flex-col md:flex-row gap-10 justify-between items-stretch min-h-[520px]">
        <div className="md:w-1/2 shadow-xl rounded-2xl overflow-hidden p-[2em] flex-1 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-[#222357] mb-4">Our Products</h2>
          <div className="flex gap-2 mb-6 flex-wrap">
            {types.map(f => (
              <button
                key={f.id}
                className={`px-4 py-1 rounded-full text-sm font-sm border transition ${selected === f.name ? 'bg-gradient-to-r from-blue-600 to-purple-500 text-white shadow-lg' : 'bg-white text-[#222357] border-blue-200 hover:bg-blue-100'}`}
                onClick={() => setSelected(f.name)}
              >
                {f.name}
              </button>
            ))}
          </div>
          <div className="relative w-full">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full shadow p-2 hover:bg-blue-100 transition hidden md:block focus:outline-none"
              onClick={() => scrollShowcase('left')}
              aria-label="Scroll left"
              type="button"
            >
              <FaChevronLeft className="text-2xl text-blue-600" />
            </button>
            <div
              ref={showcaseRef}
              className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: 'none' }}
            >
              {filtered?.length > 0 ? (
                filtered.map((projectData) => <ProjectCard key={projectData.id} project={projectData} />)
              ) : null}
            </div>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 rounded-full shadow p-2 hover:bg-blue-100 transition hidden md:block focus:outline-none"
              onClick={() => scrollShowcase('right')}
              aria-label="Scroll right"
              type="button"
            >
              <FaChevronRight className="text-2xl text-blue-600" />
            </button>
          </div>
        </div>

        <div id='process' className="md:w-1/2 gap-2 shadow-xl rounded-2xl overflow-hidden p-[2em] flex-1 flex flex-col bg-white">
          {/* How We Work - Process Flow */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#222357] mb-3">How We Work</h3>
            <div className="flex items-center gap-1 text-base font-medium text-[#222357] flex-wrap justify-center md:justify-start"> {/* Added justify-center for small screens */}
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full whitespace-nowrap">Discovery</span>
              <FaArrowRight className="text-blue-500 text-xl" />
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full whitespace-nowrap">Design Sprint</span>
              <FaArrowRight className="text-blue-500 text-xl" />
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full whitespace-nowrap">Develop</span>
              <FaArrowRight className="text-blue-500 text-xl" />
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full whitespace-nowrap">Scale</span>
              <FaArrowRight className="text-blue-500 text-xl" />
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full whitespace-nowrap">Optimize & Support</span> {/* Changed 'Enterprise' for a more active phase */}
            </div>
          </div>

          {/* What We Deliver / Core Services */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#222357] mb-3 mt-4">What We Deliver</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <FaCode className="text-blue-500 text-lg mt-1 flex-shrink-0" />
                <span>Custom Web & Mobile Development</span>
              </div>
              <div className="flex items-start gap-2">
                <FaChartLine className="text-purple-500 text-lg mt-1 flex-shrink-0" />
                <span>Scalable API Design & Implementation</span>
              </div>
              <div className="flex items-start gap-2">
                <FaUsers className="text-green-500 text-lg mt-1 flex-shrink-0" />
                <span>Dedicated Team Augmentation</span>
              </div>
              <div className="flex items-start gap-2">
                <FaCheckCircle className="text-red-500 text-lg mt-1 flex-shrink-0" />
                <span>Quality Assurance & Testing</span>
              </div>
            </div>
          </div>

          {/* Methodology Section */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-[#222357] mb-3 mt-4">Our Agile Methodology</h3>
            <div className="flex items-start gap-2 text-blue-700 font-semibold mb-2">
              <FaRunning className="text-xl flex-shrink-0 mt-1" />
              <span>Iterative Development, Continuous Feedback</span>
            </div>
            <ul className="list-disc list-inside text-gray-600 text-sm pl-4">
              <li>Sprint planning & daily stand-ups</li>
              <li>Regular client demos & feedback loops</li>
              <li>Flexible and adaptable to evolving requirements</li>
              <li>Focus on delivering working software quickly</li>
            </ul>
          </div>

          {/* Client Testimonials / Trust & Partnerships */}
          <div>
            <h4 className="text-lg md:text-xl font-bold text-[#222357] mb-4 mt-4">Trusted By</h4>
            <div className="grid grid-cols-3 gap-y-4 gap-x-2 sm:flex sm:flex-wrap sm:gap-6 items-center justify-around sm:justify-start"> {/* Changed to grid for better small screen layout, flex for larger */}
              <div className="flex flex-col items-center min-w-[80px]">
                <FaBuilding className="text-3xl text-gray-500 mb-1" />
                <span className="text-xs text-gray-600 text-center">Fortune 500<br />Companies</span>
              </div>
              <div className="flex flex-col items-center min-w-[80px]">
                <FaTrophy className="text-3xl text-blue-500 mb-1" />
                <span className="text-xs text-gray-600 text-center">Industry<br />Leaders</span> {/* Changed 'Fortune Gateway' to be more general */}
              </div>
              <div className="flex flex-col items-center min-w-[80px]">
                <SiYcombinator className="text-3xl text-orange-400 mb-1" />
                <span className="text-xs text-gray-600 text-center">Leading<br />Startups</span> {/* Changed 'Y Combinator' to be more general */}
              </div>
              {/* Add more as needed, e.g., for specific industries */}
              <div className="flex flex-col items-center min-w-[80px]">
                <FaUsers className="text-3xl text-purple-500 mb-1" />
                <span className="text-xs text-gray-600 text-center">Global<br />Enterprises</span>
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-500 text-center sm:text-left">Our Valued Clients & Partners across diverse sectors.</div> {/* Made text larger and more prominent */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioShowcase;
