import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import ExperienceCard from '../Components/ExperienceCard.jsx';
import Filter from '../Components/Filter.jsx';
import experiencesData from '../data/experiences.json';

const Experience = () => {
  const [filteredExperiences, setFilteredExperiences] = useState(experiencesData);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleFilterChange = (filtered, filters) => {
    setFilteredExperiences(filtered);
    setSelectedFilters(filters || []);
  };

  const handleCardClick = (experience) => {
    setSelectedExperience(experience);
  };

  const handleCloseOverlay = () => {
    setSelectedExperience(null);
  };

  const isImagePath = (logo) => {
    if (!logo) return false;
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'];
    return imageExtensions.some((ext) => logo.toLowerCase().includes(ext));
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-[#ba7893]/10 to-[#e9b6b5]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-[#5a6cb8]/10 to-[#ba7893]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-br from-[#342d66]/5 to-[#5a6cb8]/5 rounded-full blur-2xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex-shrink-0 mb-6 md:mb-8 relative z-10 mt-16 md:mt-20"
      >
        <motion.h2
          className="text-5xl md:text-7xl font-black bg-gradient-to-r from-[#342d66] via-[#5a6cb8] to-[#ba7893] bg-clip-text text-transparent text-center tracking-tight mb-3"
          initial={{ letterSpacing: '-0.05em' }}
          animate={{ letterSpacing: '-0.02em' }}
          transition={{ duration: 1 }}
        >
          Experiences
        </motion.h2>

        <motion.div
          className="h-2 w-28 bg-gradient-to-r from-[#ba7893] via-[#e9b6b5] to-[#ba7893] mx-auto rounded-full shadow-lg"
          animate={{ width: ['7rem', '9rem', '7rem'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <div className="w-full h-[60vh] max-w-[95vw] lg:max-w-7xl flex items-center justify-center px-4 md:px-8 relative z-10">
        <div className="absolute top-1 md:top-4 right-16 md:right-28 lg:right-36 z-20">
          <Filter data={experiencesData} onFilterChange={handleFilterChange} />
        </div>

        <div className="w-full h-[40vh] md:h-[52vh] overflow-x-auto overflow-y-hidden scroll-smooth custom-scrollbar py-1 md:py-12">
          <AnimatePresence mode="popLayout">
            <div className="flex gap-8 md:gap-12 h-full items-center px-4">
              {filteredExperiences.map((experience, index) => (
                <div
                  key={experience.id}
                  className="flex-shrink-0 w-[75vw] sm:w-[65vw] md:w-[480px] lg:w-[550px] h-full"
                >
                  <ExperienceCard
                    experience={experience}
                    index={index}
                    matchCount={experience.matchCount || 0}
                    selectedFilters={selectedFilters}
                    onClick={() => handleCardClick(experience)}
                  />
                </div>
              ))}
            </div>
          </AnimatePresence>
        </div>
      </div>

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

      <AnimatePresence>
        {selectedExperience && (
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
              className="bg-white/95 backdrop-blur-xl rounded-2xl md:rounded-3xl p-5 md:p-8 max-w-3xl w-[90%] max-h-[55vh] overflow-y-auto shadow-2xl border-2 border-[#ba7893]/40"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start gap-3 md:gap-6 mb-4 md:mb-6">
                <div className="w-14 h-14 md:w-24 md:h-24 rounded-xl md:rounded-3xl bg-gradient-to-br from-[#ba7893] via-[#c98ba4] to-[#e9b6b5] flex items-center justify-center shadow-2xl flex-shrink-0 p-1.5 md:p-3">
                  {isImagePath(selectedExperience.logo) ? (
                    <img
                      src={selectedExperience.logo}
                      alt={`${selectedExperience.company} logo`}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-3xl md:text-5xl">{selectedExperience.logo}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  {selectedExperience.company && (
                    <h3 className="text-xl md:text-4xl font-bold text-[#342d66] mb-0.5 md:mb-2 leading-tight">
                      {selectedExperience.company}
                    </h3>
                  )}
                  {selectedExperience.role && (
                    <p className="text-base md:text-2xl text-[#5a6cb8] font-bold mb-0.5 md:mb-2 leading-tight">
                      {selectedExperience.role}
                    </p>
                  )}
                  {selectedExperience.duration && (
                    <div className="flex items-center gap-2">
                      <div className="h-0.5 md:h-1 w-6 md:w-10 bg-gradient-to-r from-[#ba7893] to-[#e9b6b5] rounded-full" />
                      <p className="text-xs md:text-lg text-gray-500 font-medium">
                        {selectedExperience.duration}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {selectedExperience.description && (
                <div className="mb-4 md:mb-6">
                  <h4 className="text-base md:text-xl font-bold text-[#342d66] mb-2 md:mb-3">
                    Description
                  </h4>
                  {Array.isArray(selectedExperience.description) ? (
                    <ul className="space-y-1.5 md:space-y-3 text-gray-700 text-xs md:text-lg leading-relaxed">
                      {selectedExperience.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 md:gap-3">
                          <span className="text-[#5a6cb8] text-sm md:text-xl mt-0.5 flex-shrink-0">
                            •
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700 text-xs md:text-lg leading-relaxed">
                      {selectedExperience.description}
                    </p>
                  )}
                </div>
              )}

              {selectedExperience.technologies && selectedExperience.technologies.length > 0 && (
                <div>
                  <h4 className="text-base md:text-xl font-bold text-[#342d66] mb-2 md:mb-3">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-1.5 md:gap-3">
                    {selectedExperience.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 md:px-5 md:py-2.5 rounded-full text-xs md:text-base font-bold bg-gradient-to-r from-[#ba7893] to-[#e9b6b5] text-white border-2 border-[#ba7893] shadow-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-center text-xs md:text-sm text-gray-500 mt-4 md:mt-8">
                Click outside to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Experience;
