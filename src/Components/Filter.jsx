import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const Filter = ({ data, onFilterChange, buttonClassName = '' }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [technologies, setTechnologies] = useState([]);
  const [skills, setSkills] = useState([]);
  const filterRef = useRef(null);

  useEffect(() => {
    // Extract technologies and skills separately
    const techSet = new Set();
    const skillSet = new Set();

    data.forEach((item) => {
      item.technologies?.forEach((tech) => techSet.add(tech));
      item.tags?.forEach((tag) => skillSet.add(tag));
    });

    setTechnologies(Array.from(techSet).sort());
    setSkills(Array.from(skillSet).sort());
  }, [data]);

  useEffect(() => {
    // Pass filtered and sorted data back to parent
    onFilterChange(getFilteredAndSorted());
  }, [selectedFilters, data]);

  // Handle click outside to close filter
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      // Use capture phase to catch clicks before they're handled by other elements
      document.addEventListener('mousedown', handleClickOutside, true);
      document.addEventListener('touchstart', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
    };
  }, [showFilters]);

  const toggleFilter = (tag) => {
    setSelectedFilters((prev) =>
      prev.includes(tag) ? prev.filter((f) => f !== tag) : [...prev, tag],
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
  };

  const getFilteredAndSorted = () => {
    if (selectedFilters.length === 0) {
      return data.map((item) => ({ ...item, matchCount: 0 }));
    }

    return [...data]
      .map((item) => {
        const allItemTags = [...(item.tags || []), ...(item.technologies || [])];
        const matchCount = selectedFilters.filter((filter) => allItemTags.includes(filter)).length;
        return { ...item, matchCount };
      })
      .filter((item) => item.matchCount > 0)
      .sort((a, b) => {
        // First sort by match count (descending)
        if (b.matchCount !== a.matchCount) {
          return b.matchCount - a.matchCount;
        }
        // Then by year (most recent first)
        const yearA = parseInt(a.duration.split(' - ')[1]);
        const yearB = parseInt(b.duration.split(' - ')[1]);
        return yearB - yearA;
      });
  };

  return (
    <div ref={filterRef}>
      {/* Filter Button */}
      <motion.button
        onClick={() => setShowFilters(!showFilters)}
        className={`px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-1.5 text-xs font-semibold border border-gray-200 hover:border-[#ba7893]/40 ${buttonClassName}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-[#ba7893]">Filter</span>
        {selectedFilters.length > 0 && (
          <span className="bg-[#ba7893] text-white px-1.5 py-0.5 rounded-full text-[10px] min-w-[16px] text-center">
            {selectedFilters.length}
          </span>
        )}
      </motion.button>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-16 right-0 w-[90vw] max-w-md z-30 overflow-hidden"
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-5 shadow-2xl border-2 border-[#ba7893]/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#342d66]">Skills & Technologies</h3>
                {selectedFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#ba7893] hover:text-[#342d66] font-semibold transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="space-y-5 max-h-96 overflow-y-auto scrollbar-hide">
                {/* Technologies Section */}
                {technologies.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold text-[#5a6cb8] tracking-wider mb-2.5 uppercase">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((tech) => (
                        <button
                          key={tech}
                          onClick={() => toggleFilter(tech)}
                          className={`px-3 py-1.5 rounded-full font-semibold text-xs transition-all duration-300 ${
                            selectedFilters.includes(tech)
                              ? 'bg-gradient-to-r from-[#ba7893] to-[#e9b6b5] text-white shadow-lg scale-105'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {tech}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skills Section */}
                {skills.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-bold text-[#5a6cb8] tracking-wider mb-2.5 uppercase">
                      Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <button
                          key={skill}
                          onClick={() => toggleFilter(skill)}
                          className={`px-3 py-1.5 rounded-full font-semibold text-xs transition-all duration-300 ${
                            selectedFilters.includes(skill)
                              ? 'bg-gradient-to-r from-[#ba7893] to-[#e9b6b5] text-white shadow-lg scale-105'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedFilters.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-[#342d66]">
                      {getFilteredAndSorted().length}
                    </span>{' '}
                    item{getFilteredAndSorted().length !== 1 ? 's' : ''} match your filters
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filter;
