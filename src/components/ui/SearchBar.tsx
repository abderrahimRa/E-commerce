"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";

interface SearchBarProps {
  className?: string;
  isMobile?: boolean;
  onClose?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  className = "",
  isMobile = false,
  onClose,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSearchTerm("");
    inputRef.current?.focus();
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    if (isMobile && onClose) {
      onClose();
    }
  };

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      setSearchTerm("");
      if (isMobile && onClose) {
        onClose();
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
        setSearchTerm("");
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const getContainerStyles = () => {
    if (isMobile) {
      return "w-full";
    }
    return `hidden md:flex ${className}`;
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative h-12 bg-black rounded-full flex items-center justify-center overflow-hidden group ${getContainerStyles()}`}
      initial={false}
      animate={{
        width: isExpanded ? (isMobile ? "100%" : "500px") : "48px",
        boxShadow: isHovered
          ? "0 10px 25px -5px rgba(0,0,0,0.2)"
          : "0 4px 6px -1px rgba(0,0,0,0.1)",
      }}
      transition={{
        width: {
          type: "spring",
          stiffness: 300,
          damping: 30,
        },
        boxShadow: {
          duration: 0.2,
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.button
        className="absolute left-0 w-12 h-12 flex items-center justify-center text-white z-10"
        onClick={handleToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="search"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Search className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.form
            onSubmit={handleSearch}
            className="absolute inset-0 flex items-center justify-between pl-12 pr-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Discover ..."
              className="bg-transparent text-white text-base w-full focus:outline-none placeholder-gray-400 px-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <AnimatePresence>
              {searchTerm && (
                <motion.div
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <motion.button
                    type="button"
                    className="text-gray-400 hover:text-white p-2"
                    onClick={handleClear}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                  
                    <X className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    type="submit"
                    className="bg-white text-black rounded-full p-2 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ type: "tween", ease: "easeInOut" }}
                    />
                    <ArrowRight className="w-4 h-4 relative z-10" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        )}
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-white/5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Sparkles effect */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={controls}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isExpanded ? [0, 1, 0] : 0,
              scale: isExpanded ? [0, 1, 0] : 0,
              x: isExpanded ? [0, Math.random() * 100 - 50] : 0,
              y: isExpanded ? [0, Math.random() * 100 - 50] : 0,
            }}
            transition={{ duration: 0.5, delay: Math.random() * 0.2 }}
          >
            <Sparkles className="text-yellow-300" size={8} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SearchBar;
