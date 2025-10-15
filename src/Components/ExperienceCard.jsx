import { motion } from 'framer-motion';

const ExperienceCard = ({ experience, index, matchCount, selectedFilters = [], onClick }) => {
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
      onClick={onClick}
    >
      <div className="h-full relative bg-gradient-to-br from-white/90 via-white/85 to-white/80 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 transition-all duration-500 flex flex-col border-2 border-[#ba7893]/40 shadow-[0_20px_60px_rgba(186,120,147,0.25)] hover:shadow-[0_30px_80px_rgba(186,120,147,0.35)] hover:border-[#ba7893]/60 group overflow-hidden cursor-pointer">
        {/* Match count badge */}
        {matchCount > 0 && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-[#ba7893] to-[#e9b6b5] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20">
            {matchCount} match{matchCount !== 1 ? 'es' : ''}
          </div>
        )}

        {/* Animated gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ba7893]/5 via-transparent to-[#5a6cb8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ba7893]/20 to-transparent rounded-bl-[4rem] opacity-50" />

        {/* Company Header */}
        <div className="flex items-start gap-4 md:gap-5 mb-4 relative z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-[#ba7893] via-[#c98ba4] to-[#e9b6b5] flex items-center justify-center shadow-2xl flex-shrink-0 relative overflow-hidden">
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

            {/* Check if logo is an image path or emoji/text */}
            {isImagePath(experience.logo) ? (
              <img
                src={experience.logo}
                alt={`${experience.company} logo`}
                className="w-12 h-12 md:w-16 md:h-16 object-contain relative z-10 p-1"
                onError={(e) => {
                  e.target.style.display = 'none';
                  console.error('Failed to load image:', experience.logo);
                }}
              />
            ) : (
              <span className="relative z-10 text-3xl md:text-4xl">{experience.logo}</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-2xl md:text-3xl font-bold text-[#342d66] mb-1.5 leading-tight group-hover:text-[#5a6cb8] transition-colors duration-300">
              {experience.company}
            </h3>
            <p className="text-lg md:text-xl text-[#5a6cb8] font-bold mb-1.5 leading-tight">
              {experience.role}
            </p>
            <div className="flex items-center gap-2">
              <div className="h-1 w-8 bg-gradient-to-r from-[#ba7893] to-[#e9b6b5] rounded-full" />
              <p className="text-sm md:text-base text-gray-500 font-medium">
                {experience.duration}
              </p>
            </div>
          </div>
        </div>

        {/* Description preview - flexible space that fills available area */}
        <div className="relative z-10 flex-1 overflow-hidden mb-2">
          {Array.isArray(experience.description) ? (
            <ul className="space-y-2 text-gray-700 text-base md:text-lg leading-relaxed font-medium line-clamp-6">
              {experience.description.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#ba7893] text-lg mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium line-clamp-6">
              {experience.description}
            </p>
          )}
        </div>

        {/* Technologies - fixed at bottom */}
        <div className="relative z-10 flex-shrink-0">
          <div className="flex gap-2.5 overflow-x-auto scrollbar-hide">
            {experience.technologies.map((tech, techIndex) => {
              const isMatched = selectedFilters.includes(tech);
              return (
                <motion.span
                  key={techIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: techIndex * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`px-4 py-2 rounded-full text-sm md:text-base font-bold border-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-default whitespace-nowrap flex-shrink-0 ${
                    isMatched
                      ? 'bg-gradient-to-r from-[#ba7893] to-[#e9b6b5] text-white border-[#ba7893] scale-105 shadow-lg'
                      : 'bg-gradient-to-r from-[#ba7893]/25 to-[#e9b6b5]/25 text-[#342d66] border-[#ba7893]/40 hover:border-[#ba7893]/60'
                  }`}
                >
                  {tech}
                </motion.span>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
