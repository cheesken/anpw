import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ProjectCard from '../Components/ProjectCard';
import Filter from '../Components/Filter';
import projectsData from '../data/projects.json';

const Projects = () => {
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleFilterChange = (filtered) => {
    setFilteredProjects(filtered);
  };

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseOverlay = () => {
    setSelectedProject(null);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-[#ba7893]/10 to-[#e9b6b5]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-[#5a6cb8]/10 to-[#ba7893]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-br from-[#342d66]/5 to-[#5a6cb8]/5 rounded-full blur-2xl" />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex-shrink-0 mb-6 md:mb-8 relative z-10 mt-16 md:mt-20"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-black bg-gradient-to-r from-[#342d66] via-[#5a6cb8] to-[#ba7893] bg-clip-text text-transparent text-center tracking-tight mb-3"
          initial={{ letterSpacing: '-0.05em' }}
          animate={{ letterSpacing: '-0.02em' }}
          transition={{ duration: 1 }}
        >
          Projects
        </motion.h1>

        <motion.div
          className="h-2 w-28 bg-gradient-to-r from-[#ba7893] via-[#e9b6b5] to-[#ba7893] mx-auto rounded-full shadow-lg"
          animate={{ width: ['7rem', '9rem', '7rem'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Cards Container with Filter Button */}
      <div className="w-full h-[60vh] max-w-[95vw] lg:max-w-7xl flex items-center justify-center px-4 md:px-8 relative z-10">
        {/* Filter Component - Top Right of Container */}
        <div className="absolute top-1 md:top-4 right-16 md:right-28 lg:right-36 z-20">
          <Filter data={projectsData} onFilterChange={handleFilterChange} />
        </div>

        <div className="w-full h-[40vh] md:h-[52vh] overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide py-1 md:py-12">
          <AnimatePresence mode="popLayout">
            <div className="flex gap-8 md:gap-12 h-full items-center px-4">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex-shrink-0 w-[75vw] sm:w-[65vw] md:w-[480px] lg:w-[550px] h-full"
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    matchCount={project.matchCount || 0}
                    selectedFilters={[]}
                    onClick={() => handleCardClick(project)}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex-shrink-0 mb-8 text-[#ba7893] text-base font-semibold flex items-center gap-3 relative z-10"
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-2xl"
        >
          →
        </motion.div>
      </motion.div>

      {/* Expanded Card Overlay - Mobile Optimized */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4"
            onClick={handleCloseOverlay}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-3xl p-5 md:p-8 max-w-3xl w-full max-h-[55vh] overflow-y-auto shadow-2xl border-2 border-[#ba7893]/40"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Project Header */}
              <div className="flex items-start gap-4 md:gap-6 mb-5 md:mb-6">
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#ba7893] via-[#c98ba4] to-[#e9b6b5] flex items-center justify-center text-3xl md:text-5xl shadow-2xl flex-shrink-0">
                  {selectedProject.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl md:text-4xl font-bold text-[#342d66] mb-2 md:mb-3 leading-tight">
                    {selectedProject.name}
                  </h2>
                </div>
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#5a6cb8] hover:text-[#ba7893] transition-all duration-300 hover:scale-110 flex-shrink-0"
                    title="View on GitHub"
                  >
                    <svg className="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Description */}
              <div className="mb-5 md:mb-6">
                <h3 className="text-lg md:text-xl font-bold text-[#342d66] mb-2 md:mb-3">
                  Description
                </h3>
                {Array.isArray(selectedProject.description) ? (
                  <ul className="space-y-2 md:space-y-3 text-gray-700 text-sm md:text-lg leading-relaxed">
                    {selectedProject.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 md:gap-3">
                        <span className="text-[#ba7893] text-base md:text-xl mt-0.5 flex-shrink-0">
                          •
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
                    {selectedProject.description}
                  </p>
                )}
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg md:text-xl font-bold text-[#342d66] mb-2 md:mb-3">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 md:px-5 md:py-2.5 rounded-full text-sm md:text-base font-bold bg-gradient-to-r from-[#ba7893] to-[#e9b6b5] text-white border-2 border-[#ba7893] shadow-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Close hint */}
              <p className="text-center text-xs md:text-sm text-gray-500 mt-6 md:mt-8">
                Click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
