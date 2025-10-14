import { motion } from 'framer-motion';

const ProjectCard = ({ project, index, matchCount, selectedFilters = [], onClick }) => {
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

        {/* Project Header */}
        <div className="flex items-start gap-4 md:gap-5 mb-5 relative z-10">
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-gradient-to-br from-[#ba7893] via-[#c98ba4] to-[#e9b6b5] flex items-center justify-center text-3xl md:text-4xl shadow-2xl flex-shrink-0 relative overflow-hidden"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative z-10">{project.logo}</span>
          </motion.div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl md:text-3xl font-bold text-[#342d66] leading-tight group-hover:text-[#5a6cb8] transition-colors duration-300">
                {project.name}
              </h3>
              {/* GitHub Icon */}

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[#5a6cb8] hover:text-[#ba7893] transition-all duration-300 hover:scale-110"
                title="View on GitHub"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex-1 relative z-10 mb-5 overflow-y-auto scrollbar-hide">
          <p className="text-gray-700 text-base md:text-lg leading-relaxed font-medium">
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2.5 relative z-10 mt-auto">
          {project.technologies.map((tech, techIndex) => {
            const isMatched = selectedFilters.includes(tech);
            return (
              <motion.span
                key={techIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className={`px-4 py-2 rounded-full text-sm md:text-base font-bold border-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-default ${
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
    </motion.div>
  );
};

export default ProjectCard;
