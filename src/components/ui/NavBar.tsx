import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Info,
  Settings,
  Phone,
  ChevronRight,
  Search,
  ShoppingCart,
  LogIn,
} from "lucide-react";
import SearchBar from "./SearchBar";
import Link from "next/link";

const NavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldShowNavbar, setShouldShowNavbar] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const menuItems = [
    { name: "Home", icon: Home, href: "/home" },
    { name: "Chart", icon: ShoppingCart, href: "/MyCart" },
    { name: "Login", icon:LogIn , href: "/Login" },
    { name: "Services", icon: Settings, href: "/services" },
    { name: "Contact", icon: Phone, href: "/contact" },
    { name: "About", icon: Info, href: "/about" },
  ];

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const menuItemVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: -20,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setShouldShowNavbar(false);
          setIsSidebarOpen(false);
        } else {
          // Scrolling up
          setShouldShowNavbar(true);
        }
        setLastScrollY(currentScrollY);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // Cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  const handleMobileSearchClick = () => {
    setIsMobileSearchOpen(true);
    // Use setTimeout to ensure the input is focused after the SearchBar is rendered
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-80 backdrop-blur-md shadow-md transition-all duration-300"
        initial="visible"
        animate={shouldShowNavbar ? "visible" : "hidden"}
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="#"
                className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
              >
                RaHiM
              </a>
            </motion.div>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
              {menuItems.map((item) => (
                <Link key={item.name} href={item.href} passHref>
                  <motion.div
                    className="text-gray-800 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </div>
            {/* Mobile Menu and Search Buttons */}
            <div className="flex items-center md:hidden">
              <motion.button
                className="p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none"
                onClick={handleMobileSearchClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className="w-6 h-6" />
              </motion.button>
              <motion.button
                className="ml-3 p-2 rounded-md text-gray-800 hover:text-gray-600 focus:outline-none"
                onClick={() => setIsSidebarOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>
        {/* Mobile Search Bar */}
        <AnimatePresence>
          {isMobileSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <SearchBar
                  isMobile={true}
                  onClose={() => setIsMobileSearchOpen(false)}
                  inputRef={searchInputRef}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg"
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Menu</h2>
                <motion.button
                  onClick={() => setIsSidebarOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              <div className="p-4">
                {menuItems.map((item) => (
                  <Link key={item.name} href={item.href} passHref>
                    <motion.div
                      className="py-2 text-gray-800 hover:text-gray-600 transition-colors flex items-center gap-2"
                      variants={menuItemVariants}
                      whileHover={{ x: 10 }}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
