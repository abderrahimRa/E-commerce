import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronUp, Facebook, Instagram, Twitter, Mail, ChevronDown } from 'lucide-react';

const HomeFooter: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sectionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto' },
  };

  const sections = [
    { title: "Discover", links: ["New Arrivals", "Bestsellers", "Collections", "Sale"] },
    { title: "Support", links: ["FAQ", "Shipping", "Returns", "Size Guide"] },
    { title: "Company", links: ["Our Story", "Careers", "Press", "Sustainability"] },
  ];

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-100 to-gray-200 pt-10 pb-6 overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 z-0">
        <svg className="absolute bottom-0 left-0 right-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="rgba(229, 231, 235, 0.4)" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,229.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="space-y-4 mb-8">
          {sections.map((section) => (
            <div key={section.title} className="border-b border-gray-300 pb-2">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex justify-between items-center text-left"
              >
                <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900">
                  {section.title}
                </h3>
                <motion.div
                  animate={{ rotate: expandedSection === section.title ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} className="text-gray-600" />
                </motion.div>
              </button>
              <AnimatePresence>
                {expandedSection === section.title && (
                  <motion.ul
                    variants={sectionVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="mt-2 space-y-2"
                  >
                    {section.links.map((link) => (
                      <motion.li key={link}>
                        <Link href={`/${link.toLowerCase().replace(" ", "-")}`} className="text-gray-600 hover:text-gray-900 transition-colors duration-200 block py-1">
                          {link}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center space-y-4 pt-4 border-t border-gray-300">
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <Mail size={20} />
            </a>
          </div>
          <p className="text-gray-500 text-xs text-center">&copy; 2024 Your Shop. All rights reserved.</p>
        </div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        className="fixed bottom-4 right-4 bg-white p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronUp size={20} className="text-gray-600" />
      </motion.button>
    </footer>
  );
};

export default HomeFooter;