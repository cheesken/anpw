import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experiences' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact Me', href: '#contact' },
  ];

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
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white transition-colors"
          >
            <span className="text-purple-600 font-bold text-lg md:text-xl">A</span>
          </a>
        </div>

        {/* Burger Menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 right-6 md:right-12 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden min-w-[200px]"
            onMouseLeave={() => {
              setTimeout(() => setIsMenuOpen(false), 1000);
            }}
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
