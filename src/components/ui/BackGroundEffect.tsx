    import React, { useState, useEffect } from "react";
    import { motion } from "framer-motion";

    interface Dot {
      top: string;
      left: string;
      size: number;
      opacity: number;
    }

    const generateDots = (count: number): Dot[] => {
      return Array.from({ length: count }).map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 30 + 5,
        opacity: Math.random() * 0.3 + 0.1,
      }));
    };

    interface BackgroundEffectProps {
      mousePosition: { x: number; y: number };
    }

    const BackgroundEffect: React.FC<BackgroundEffectProps> = ({
      mousePosition,
    }) => {
      const [mounted, setMounted] = useState(false);
      const [dots] = useState(generateDots(30));

      useEffect(() => {
        setMounted(true);
      }, []);

      return (
        <>
          <motion.div
            className="fixed inset-0 z-0"
            animate={{
              background: `radial-gradient(circle at ${mousePosition.x * 100}% ${
                mousePosition.y * 100
              }%, rgba(249,250,251,0.8) 0%, transparent 60%)`,
            }}
            transition={{ duration: 0.3 }}
          />

          {mounted && (
            <div className="fixed inset-0 z-0 pointer-events-none">
              {dots.map((dot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: dot.opacity, scale: 1 }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "mirror",
                    delay: index * 0.2,
                  }}
                  className="absolute bg-black rounded-full"
                  style={{
                    top: dot.top,
                    left: dot.left,
                    width: dot.size,
                    height: dot.size,
                  }}
                />
              ))}
            </div>
          )}
        </>
      );
    };

    export default BackgroundEffect;
