import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import profileImage from '../data/1.JPG';

const Home = () => {
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "Hi, I'm Ananya!";

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Smooth scroll function
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();

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
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-md"
      >
        {/* Profile Picture */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white p-1 shadow-2xl">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={profileImage}
                alt="Ananya's Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 pt-20 md:p-10 md:pt-24">
          {/* Typing Animation Text */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="text-4xl md:text-5xl font-bold text-[#342d66] mb-4 min-h-[3rem]"
          >
            {displayedText}
            {displayedText !== fullText && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="inline-block w-0.5 h-8 md:h-10 bg-[#5a6cb8] ml-1"
              />
            )}
          </motion.h1>

          {/* Description Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 text-base md:text-lg leading-relaxed mb-8"
          >
            I'm a software engineer who ships. I spent 3 years building enterprise storage systems
            at NetApp. Now I'm exploring AI agents, cloud platforms, and distributed systems. I love
            tackling complex challenges and delivering solutions that scale.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <motion.a
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, 'projects')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="px-6 py-3 bg-gradient-to-r from-[#5a6cb8] to-[#ba7893] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Projects
            </motion.a>
            <motion.a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, 'contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="px-6 py-3 bg-white border-2 border-[#5a6cb8] text-[#5a6cb8] rounded-full font-semibold shadow-lg hover:shadow-xl hover:bg-[#5a6cb8] hover:text-white transition-all duration-300"
            >
              Contact Me
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
