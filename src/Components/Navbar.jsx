import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experiences' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact Me', href: '#contact' },
  ];

  // Handle click outside to close menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event) => {
      // Don't close if clicking inside menu or button
      if (menuRef.current?.contains(event.target) || buttonRef.current?.contains(event.target)) {
        return;
      }

      setIsMenuOpen(false);
    };

    // Small delay to prevent immediate closing when opening
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
  }, [isMenuOpen]);

  // Handle scroll to close menu
  useEffect(() => {
    if (!isMenuOpen) return;

    const scrollContainer = document.querySelector('.snap-y');
    if (!scrollContainer) return;

    const handleScroll = () => {
      setIsMenuOpen(false);
    };

    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isMenuOpen]);

  // Smooth scroll function
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');

    // Get the scroll container (the div with snap behavior)
    const scrollContainer = document.querySelector('.snap-y');
    const targetSection = document.getElementById(targetId);

    if (targetSection && scrollContainer) {
      // Get the position of the target section relative to the container
      const targetPosition = targetSection.offsetTop;

      // Scroll the container to the target position
      scrollContainer.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }

    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="px-4 py-2 md:px-5 md:py-2.5 rounded-xl bg-white/90 backdrop-blur-sm flex items-center gap-2 cursor-pointer hover:bg-white transition-all hover:shadow-lg group"
          >
            <div className="flex items-center">
              {/* Hexagon icon */}
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 md:w-7 md:h-7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5a6cb8" />
                    <stop offset="100%" stopColor="#ba7893" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2L21 7V17L12 22L3 17V7L12 2Z"
                  fill="url(#hexGradient)"
                  stroke="#342d66"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <text
                  x="12"
                  y="16"
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  A
                </text>
              </svg>
              {/* Name text */}
              <span className="ml-2 text-[#342d66] font-bold text-base md:text-lg tracking-tight group-hover:text-[#5a6cb8] transition-colors">
                Ananya
              </span>
            </div>
          </a>
        </div>

        {/* Burger Menu */}
        <button
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(!isMenuOpen);
          }}
          className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center gap-1.5 hover:bg-white transition-colors"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-purple-600 rounded-full"
          />
          <motion.span
            animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-0.5 bg-purple-600 rounded-full"
          />
          <motion.span
            animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="w-6 h-0.5 bg-purple-600 rounded-full"
          />
        </button>
      </div>

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10 md:bg-transparent"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 right-6 md:right-12 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden min-w-[200px] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={(e) => handleNavClick(e, item.href)}
                className="block px-6 py-4 text-gray-800 hover:bg-purple-50 hover:text-purple-600 transition-colors font-medium border-b border-gray-100 last:border-b-0"
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
