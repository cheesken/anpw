import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import profileImageDesktop from '../data/3.JPG';
import profileImageMobile from '../data/4.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.message) {
      setSubmitStatus('Please fill in email and message fields');
      setTimeout(() => setSubmitStatus(''), 3000);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setSubmitStatus('Message sent successfully!');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(''), 3000);
    }, 1000);
  };

  return (
    <div className="h-screen w-full flex items-center justify-center px-4 md:px-8 relative overflow-hidden py-4 md:py-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-4xl"
      >
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-[#ba7893]/30 overflow-hidden">
          <div className="grid md:grid-cols-5 gap-0">
            {/* Right Side - Image (2 columns) - Shows first on mobile */}
            <div className="md:col-span-2 order-1 md:order-2 bg-gradient-to-br from-[#ba7893]/10 to-[#5a6cb8]/10 flex items-center justify-center p-0 h-40 md:h-auto">
              <div className="w-full h-full relative overflow-hidden">
                <img
                  src={isMobile ? profileImageMobile : profileImageDesktop}
                  alt="Ananya's Profile"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 30%' }}
                />
              </div>
            </div>

            {/* Left Side - Contact Form (3 columns) - Shows second on mobile */}
            <div className="md:col-span-3 order-2 md:order-1 p-4 md:p-8">
              <h2 className="text-2xl md:text-4xl font-bold text-[#342d66] mb-1">Get In Touch</h2>

              <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-6">
                Have a question or want to work together?
              </p>

              <div className="space-y-2.5 md:space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#342d66] mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 md:py-2 rounded-lg border border-gray-300 focus:border-[#ba7893] focus:outline-none transition-colors bg-white/60 text-sm"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#342d66] mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-1.5 md:py-2 rounded-lg border border-gray-300 focus:border-[#ba7893] focus:outline-none transition-colors bg-white/60 text-sm"
                    placeholder="connect.with.me.ananya@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#342d66] mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-3 py-1.5 md:py-2 rounded-lg border border-gray-300 focus:border-[#ba7893] focus:outline-none transition-colors bg-white/60 resize-none text-sm"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-2 md:py-2.5 px-4 bg-gradient-to-r from-[#5a6cb8] to-[#ba7893] text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus && (
                  <p
                    className={`text-center text-xs md:text-sm font-semibold ${
                      submitStatus.includes('successfully') ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {submitStatus}
                  </p>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-3 md:mt-6 justify-center">
                <motion.a
                  href="https://github.com/cheesken"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#342d66] flex items-center justify-center text-white shadow-md hover:shadow-lg"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.a>

                <motion.a
                  href="https://linkedin.com/in/ananya-makwana"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-[#5a6cb8] flex items-center justify-center text-white shadow-md hover:shadow-lg"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
