import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import EducationCard from '../Components/EducationCard';
import educationData from '../data/education.json';

const Education = () => {
  const [selectedEducation, setSelectedEducation] = useState(null);

  const handleCardClick = (education) => {
    setSelectedEducation(education);
  };

  const handleCloseOverlay = () => {
    setSelectedEducation(null);
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
        <motion.h2
          className="text-5xl md:text-7xl font-black bg-gradient-to-r from-[#342d66] via-[#5a6cb8] to-[#ba7893] bg-clip-text text-transparent text-center tracking-tight mb-3"
          initial={{ letterSpacing: '-0.05em' }}
          animate={{ letterSpacing: '-0.02em' }}
          transition={{ duration: 1 }}
        >
          Education
        </motion.h2>

        <motion.div
          className="h-2 w-28 bg-gradient-to-r from-[#ba7893] via-[#e9b6b5] to-[#ba7893] mx-auto rounded-full shadow-lg"
          animate={{ width: ['7rem', '9rem', '7rem'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Cards Container */}
      <div className="w-full max-w-[95vw] lg:max-w-7xl flex-1 flex items-center justify-center px-4 md:px-8 relative z-10">
        <div className="w-full h-[55vh] md:h-[52vh] overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide py-12">
          <AnimatePresence mode="popLayout">
            <motion.div
              className="flex gap-8 md:gap-12 h-full items-center px-4"
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {educationData.map((education, index) => (
                <motion.div
                  key={education.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex-shrink-0 w-[75vw] sm:w-[65vw] md:w-[480px] lg:w-[550px] h-full"
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onClick={() => handleCardClick(education)}
                >
                  <EducationCard education={education} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex-shrink-0 mb-8 text-[#342d66] text-base font-semibold flex items-center gap-3 relative z-10"
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

      {/* Expanded Card Overlay */}
      <AnimatePresence>
        {selectedEducation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseOverlay}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border-2 border-[#ba7893]/40"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Education Header */}
              <div className="flex items-start gap-6 mb-6">
                {selectedEducation.logo && (
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#ba7893] via-[#c98ba4] to-[#e9b6b5] flex items-center justify-center text-5xl shadow-2xl flex-shrink-0">
                    {selectedEducation.logo}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {selectedEducation.school && (
                    <h3 className="text-4xl font-bold text-[#342d66] mb-2 leading-tight">
                      {selectedEducation.school}
                    </h3>
                  )}
                  {selectedEducation.degree && (
                    <p className="text-2xl text-[#5a6cb8] font-bold mb-2 leading-tight">
                      {selectedEducation.degree}
                    </p>
                  )}
                  {selectedEducation.duration && (
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-10 bg-gradient-to-r from-[#ba7893] to-[#e9b6b5] rounded-full" />
                      <p className="text-lg text-gray-500 font-medium">
                        {selectedEducation.duration}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Relevant Courses */}
              {selectedEducation.relevantCourses &&
                selectedEducation.relevantCourses.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-[#342d66] mb-3">Relevant Courses</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEducation.relevantCourses.map((course, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-[#5a6cb8]/25 to-[#ba7893]/25 text-[#342d66] border-2 border-[#5a6cb8]/40"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Achievements */}
              {selectedEducation.achievements && selectedEducation.achievements.length > 0 && (
                <div>
                  <h4 className="text-xl font-bold text-[#342d66] mb-3">Achievements</h4>
                  <div className="space-y-3">
                    {selectedEducation.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#ba7893] to-[#e9b6b5] mt-2 flex-shrink-0" />
                        <p className="text-gray-700 text-lg leading-relaxed">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Close hint */}
              <p className="text-center text-sm text-gray-500 mt-8">Click outside to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Education;
