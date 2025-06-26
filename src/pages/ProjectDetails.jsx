import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import SplashScreen from '../components/SplashScreen';
import { fetchProject } from '../redux/slices/Project';
import NotFound from './NotFound';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [modalImage, setModalImage] = useState(null);

  

  const {currentProject: project, loading} = useSelector(state => state.projects)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProject(projectId))
  }, [dispatch, projectId]);

  if (!loading && !project) return <NotFound/>

  if (loading || !project) return <SplashScreen />

  return (
    <div className="min-h-screen  ">
      <section className="bg-gradient-to-br from-[#0f0f26] to-[#000] text-white py-16 px-4 md:px-0">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {project.title.split(" ").map((word, i) => (
              <span
                key={i}
                className={
                  i === 2
                    ? "text-[#ffe05b]"
                    : i === 4
                      ? "text-[#5b4fff] bg-white px-2 rounded"
                      : ""
                }
              >
                {word} {" "}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl opacity-80 mb-2">{project.subtitle}</p>
          <p className="max-w-2xl mx-auto opacity-70 text-base md:text-lg">
            {project.description}
          </p>
        </div>
      </section>
      <main className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 py-12 px-4">
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1c1835] mb-2">Project Info</h2>
            <ul className="space-y-3 text-[#3d3666]">
              <li>
                <p className="font-semibold mr-4">
                  description:
                </p>{project.description}
              </li>
              <li>
                <span className="font-semibold mr-4">Status:</span>
                <span className={`p-1 rounded-sm text-white font-semibold text-[12px] ${project.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                  {project.status}
                </span>
              </li>
              <li>
                <span className="font-semibold mr-4">Stack:</span> {project.stack}
              </li>
              <li>
                <span className="font-semibold mr-4">Type:</span> {project.type?.name}
              </li>
              <li>
                <span className="font-semibold mr-4">Duration:</span> {project.fromDate} - {project.toDate || "Ongoing"}
              </li>
              <li>
                <span className="font-semibold mr-4">Price:</span> ${project.Price}
              </li>
              <li>
                <span className="font-semibold mr-4">Technologies:</span>
                <ul className="flex flex-wrap gap-2 mt-1">
                  {project.technologies?.map((tech, idx) => (
                    <li
                      key={idx}
                      className="bg-[#ede9fe] text-[#5b4fff] px-2 py-1 rounded text-xs font-semibold"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </li>
              {project.testimonial && (
                <div className="bg-[#f3f0ff] border-l-4 border-[#5b4fff] p-4 rounded shadow mb-6">
                  <span className="block text-[#5b4fff] font-bold mb-1">Testimonial</span>
                  <p className="italic text-[#3d3666]">“{project.testimonial}”</p>
                </div>
              )}
              <li>
                <span className="font-semibold mr-4">Links:</span>
                <span className="ml-2">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#5b4fff] underline mr-2"
                    >
                      Live Link
                    </a>
                  )}
                  {project.surceCode && (
                    <a
                      href={project.surceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8f6eff] underline"
                    >
                      Source Code
                    </a>
                  )}
                </span>
              </li>
            </ul>
          </div>

        </div>
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#1c1835] mb-2">Images</h2>
            <img
              onClick={() => setModalImage(project.img)}
              src={project.img} alt={project.title} className="rounded-lg border border-[#e0e7ff] shadow-sm object-cover h-[20em] w-full mb-[1em] cursor-pointer transition-transform hover:scale-105" />
            <div className="grid grid-cols-4 gap-3">
              {project.projectGallery?.map((img) => (
                <img
                  key={img.id}
                  src={img.image}
                  alt="Project screenshot"
                  className="rounded-lg border border-[#e0e7ff] shadow-sm object-cover h-32 w-full cursor-pointer transition-transform hover:scale-105"
                  onClick={() => setModalImage(img.image)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <div className="relative" onClick={e => e.stopPropagation()}>
            <img
              src={modalImage}
              alt="Large preview"
              className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-2xl border-4 border-white"
            />
            <button
              className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full px-3 py-1 text-black font-bold text-lg shadow hover:bg-opacity-100 transition"
              onClick={() => setModalImage(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
