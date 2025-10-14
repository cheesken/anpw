import { motion } from 'framer-motion';

const EducationCard = ({ education, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotateY: -15 }}
      whileInView={{ opacity: 1, rotateY: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full perspective-1000"
      whileHover={{ scale: 1.03, rotateY: 2 }}
    >
      <div className="h-full relative bg-gradient-to-br from-white/90 via-white/85 to-white/80 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 transition-all duration-500 flex flex-col border-2 border-[#ba7893]/40 shadow-[0_20px_60px_rgba(186,120,147,0.25)] hover:shadow-[0_30px_80px_rgba(186,120,147,0.35)] hover:border-[#ba7893]/60 group overflow-hidden">
        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ba7893]/5 via-transparent to-[#5a6cb8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ba7893]/20 to-transparent rounded-bl-[4rem] opacity-50" />

        {/* Education Header */}
        <div className="flex items-start gap-4 md:gap-5 mb-5 relative z-10">
          {education.logo && (
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-[#ba7893] via-[#c98ba4] to-[#e9b6b5] flex items-center justify-center text-3xl md:text-4xl shadow-2xl flex-shrink-0 relative overflow-hidden"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative z-10">{education.logo}</span>
            </motion.div>
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

        {/* Relevant Courses */}
        {education.relevantCourses && education.relevantCourses.length > 0 && (
          <div className="relative z-10 mb-5">
            <h4 className="text-sm font-bold text-[#342d66] mb-3 uppercase tracking-wide">
              Relevant Courses
            </h4>
            <div className="flex flex-wrap gap-2">
              {education.relevantCourses.map((course, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold bg-gradient-to-r from-[#5a6cb8]/25 to-[#ba7893]/25 text-[#342d66] border border-[#5a6cb8]/30"
                >
                  {course}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {education.achievements && education.achievements.length > 0 && (
          <div className="relative z-10 mt-auto">
            <h4 className="text-sm font-bold text-[#342d66] mb-3 uppercase tracking-wide">
              Achievements
            </h4>
            <div className="space-y-2">
              {education.achievements.map((achievement, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#ba7893] to-[#e9b6b5] mt-2 flex-shrink-0" />
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                    {achievement}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EducationCard;
