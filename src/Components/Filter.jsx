import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const Filter = ({ data, onFilterChange, buttonClassName = '' }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [availableGroups, setAvailableGroups] = useState([]);
  const filterRef = useRef(null);
  const buttonRef = useRef(null);

  const techGroups = {
    AWS: ['AWS S3', 'AWS EC2', 'DynamoDB'],
    'AI/ML': ['Scikit-learn', 'TensorFlow', 'PyTorch', 'GPT-4', 'NLTK', 'AWS Bedrock'],
    'Agentic AI': ['LangGraph', 'LangChain', 'AWS Nova Act SDK'],
    'Data Science': ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Streamlit'],
    Frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    Backend: ['Node.js', 'Express', 'FastAPI', 'Python'],
    Databases: ['MongoDB', 'DynamoDB'],
    DevOps: ['Docker'],
    Systems: ['C++', 'C', 'Linux'],
  };

  useEffect(() => {
    const allTechs = new Set();
    const allTags = new Set();

    data.forEach((item) => {
      item.technologies?.forEach((tech) => allTechs.add(tech));
      item.tags?.forEach((tag) => allTags.add(tag));
    });

    const groups = Object.keys(techGroups).filter((group) =>
      techGroups[group].some((tech) => allTechs.has(tech)),
    );

    // Filter out tags that match existing group names
    const tags = Array.from(allTags).filter((tag) => !groups.includes(tag));

    setAvailableGroups([...groups, ...tags]);
  }, [data]);

  useEffect(() => {
    onFilterChange(getFilteredAndSorted(), selectedFilters);
  }, [selectedFilters, data]);

  useEffect(() => {
    if (!showFilters) return;

    const handleClickOutside = (event) => {
      if (filterRef.current?.contains(event.target) || buttonRef.current?.contains(event.target)) {
        return;
      }
      setShowFilters(false);
    };

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside, true);
      document.addEventListener('touchstart', handleClickOutside, { passive: true, capture: true });
      document.addEventListener('pointerdown', handleClickOutside, true);
    }, 150);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('touchstart', handleClickOutside, true);
      document.removeEventListener('pointerdown', handleClickOutside, true);
    };
  }, [showFilters]);

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter],
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
        const itemTechs = item.technologies || [];
        const itemTags = item.tags || [];

        let matchCount = 0;

        selectedFilters.forEach((filter) => {
          if (techGroups[filter]) {
            if (techGroups[filter].some((tech) => itemTechs.includes(tech))) {
              matchCount++;
            }
          } else {
            if (itemTags.includes(filter)) {
              matchCount++;
            }
          }
        });

        return { ...item, matchCount };
      })
      .filter((item) => item.matchCount > 0)
      .sort((a, b) => {
        if (b.matchCount !== a.matchCount) {
          return b.matchCount - a.matchCount;
        }
        if (a.duration && b.duration) {
          const yearA = parseInt(a.duration.split(' - ')[1]) || 0;
          const yearB = parseInt(b.duration.split(' - ')[1]) || 0;
          return yearB - yearA;
        }
        return 0;
      });
  };

  return (
    <div className="relative">
      <motion.button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation();
          setShowFilters(!showFilters);
        }}
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

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/20 md:bg-transparent"
            onClick={() => setShowFilters(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            ref={filterRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed md:absolute top-20 md:top-16 right-4 md:right-0 w-[calc(100vw-2rem)] md:w-[90vw] max-w-md z-[70]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl p-5 shadow-2xl border-2 border-[#ba7893]/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#342d66]">Filter by Category</h3>
                {selectedFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-[#ba7893] hover:text-[#342d66] font-semibold transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {availableGroups.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => toggleFilter(filter)}
                    className={`px-3 py-1.5 rounded-full font-semibold text-xs transition-all duration-300 ${
                      selectedFilters.includes(filter)
                        ? 'bg-gradient-to-r from-[#ba7893] to-[#e9b6b5] text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
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
