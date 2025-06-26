import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const {
    title,
    stack, // Keep stack for potential use or remove if not needed in the final design
    subtitle,
    type,   // Keep type for potential use or remove if not needed in the final design
    testimonial,
    img,
    status,
    description,
    fromDate,
    toDate,
  } = project;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const truncatedDescription = description.length > 90
    ? description.substring(0, 90) + '...'
    : description;

  return (
    <div className="min-w-[260px] max-w-[280px] bg-gradient-to-br from-blue-600 to-purple-500 rounded-2xl shadow-xl p-4 flex flex-col gap-2 text-white relative">

      {/* Project Image */}
      {img && (
        <div className="mb-2">
          <img
            src={img}
            alt={title}
            className="w-full h-32 object-cover rounded-lg shadow-sm"
          />
        </div>
      )}

      {/* Title - Added 'truncate' class */}
      <h3 className="text-xl font-bold leading-tight truncate">{title}</h3>

      {/* Subtitle */}
      <p className="text-blue-100 text-xs -mt-1">{subtitle}</p>

      {/* Stack & Type (If you removed them from the previous version, you might want to consider if they are necessary for the single-line title constraint. I've left them out based on your provided code, but if you need them back, let me know where you'd like them) */}

      <div className="flex flex-wrap gap-1 text-xs mt-1">
        <span className="bg-white/20 px-2 py-0.5 rounded-full">{stack}</span>
        <span className="bg-white/20 px-2 py-0.5 rounded-full">{type?.name}</span>
      </div>


      {/* Description */}
      <p className="text-xs leading-normal text-blue-100 flex-grow mt-1">
        {truncatedDescription}
      </p>

      {/* Testimonial */}
      {testimonial && (
        <div className="mt-2 p-2 bg-white/10 rounded-md italic text-xs">
          <q>{testimonial}</q>
        </div>
      )}

      {/* Dates and Status */}
      <div className="mt-2 pt-2 border-t border-white/20 text-[10px] flex justify-between items-center">
        <div className='flex items-center gap-1'> {/* Added 'items-center' and 'gap-1' for better alignment and spacing */}
          <p>{formatDate(new Date(fromDate))}</p> -
          <p>{formatDate(new Date(toDate))}</p>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-white font-semibold text-[10px] ${status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
          {status}
        </span>
      </div>
    <Link to={`/project/${project.id}`}>
      <button className="text-white px-4 py-2 rounded-md border border-[#ccc] w-full font-semibold hover:bg-[#4b3fff] transition-colors">
        View Project
      </button>
    </Link>
    </div>

  );
};

export default ProjectCard;