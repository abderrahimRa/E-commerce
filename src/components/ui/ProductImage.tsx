import React, { useState, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

import Image from "next/image";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { StaticImageData } from "next/image";

interface ProductImageProps {
  images: (string | StaticImageData)[];

  name: string;
}

const ProductImageComponent: React.FC<ProductImageProps> = ({
  images,
  name,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  if (!isClient) {
    return null;
  }

  return (
    <motion.div
      className="lg:w-1/2 relative h-full"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full min-h-[600px] rounded-2xl overflow-hidden bg-white/90 backdrop-blur-lg shadow-xl">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <Image
                src={images[currentIndex]}
                alt={`${name} - Image ${currentIndex + 1}`}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-2 transition-colors duration-200"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 rounded-full p-2 transition-colors duration-200"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProductImageComponent;
