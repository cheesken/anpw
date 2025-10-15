import { motion } from 'framer-motion';

const EducationCard = ({ education, index }) => {
  console.log('Education object:', education);
  console.log('Has achievements?', education.achievements);
  console.log('Achievements length:', education.achievements?.length);
  // Helper function to check if logo is an image path
  const isImagePath = (logo) => {
    if (!logo) return false;
    const imageExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif'];
    return imageExtensions.some((ext) => logo.toLowerCase().includes(ext));
  };

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -15 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full perspective-1000"
      whileHover={{ scale: 1.03, rotateY: 2 }}
    >
      <div className="h-full relative bg-gradient-to-br from-white/90 via-white/85 to-white/80 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 transition-all duration-500 flex flex-col border-2 border-[#ba7893]/40 shadow-[0_20px_60px_rgba(186,120,147,0.25)] hover:shadow-[0_30px_80px_rgba(186,120,147,0.35)] hover:border-[#ba7893]/60 group overflow-hidden cursor-pointer">
        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ba7893]/5 via-transparent to-[#5a6cb8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ba7893]/20 to-transparent rounded-bl-[4rem] opacity-50" />

        {/* Education Header - Fixed */}
        <div className="flex items-start gap-4 md:gap-5 mb-4 relative z-10 flex-shrink-0">
          {education.logo && (
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-[#ba7893] via-[#c98ba4] to-[#e9b6b5] flex items-center justify-center shadow-2xl flex-shrink-0 relative overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

              {/* Check if logo is an image path or emoji/text */}
              {isImagePath(education.logo) ? (
                <img
                  src={education.logo}
                  alt={`${education.school} logo`}
                  className="w-12 h-12 md:w-16 md:h-16 object-contain relative z-10 p-2"
                />
              ) : (
                <span className="relative z-10 text-3xl md:text-4xl">{education.logo}</span>
              )}
            </div>
          )}

          <div className="flex-1 min-w-0">
            {education.school && (
              <h3 className="text-2xl md:text-3xl font-bold text-[#342d66] mb-1.5 leading-tight group-hover:text-[#5a6cb8] transition-colors duration-300">
                {education.school}
              </h3>
            )}
            {education.degree && (
              <p className="text-lg md:text-xl text-[#5a6cb8] font-bold mb-1.5 leading-tight">
                {education.degree}
              </p>
            )}
            {education.duration && (
              <div className="flex items-center gap-2">
                <div className="h-1 w-8 bg-gradient-to-r from-[#ba7893] to-[#e9b6b5] rounded-full" />
                <p className="text-sm md:text-base text-gray-500 font-medium">
                  {education.duration}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Achievements - Natural height, not flexible */}
        {education.achievements && education.achievements.length > 0 && (
          <div className="relative z-10 mb-3">
            <div className="flex flex-wrap gap-2.5">
              {education.achievements.map((achievement, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-4 py-2 rounded-full text-sm md:text-base font-bold border-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-default whitespace-nowrap flex-shrink-0 bg-gradient-to-r from-[#ba7893]/25 to-[#e9b6b5]/25 text-[#342d66] border-[#ba7893]/40 hover:border-[#ba7893]/60"
                >
                  {achievement}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Relevant Courses - Fixed at bottom, will be hidden if no space */}
        {education.relevantCourses && education.relevantCourses.length > 0 && (
          <div className="relative z-10 mt-auto flex-shrink-0">
            <h4 className="text-sm font-bold text-[#5a6cb8] mb-2 uppercase tracking-wider">
              Relevant Courses
            </h4>
            <ul className="space-y-1.5">
              {education.relevantCourses.map((course, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#5a6cb8] text-base mt-0.5 flex-shrink-0">•</span>
                  <span className="text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                    {course}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EducationCard;
