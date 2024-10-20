"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import products from "@/Data/products";
import NavBar from "@/components/ui/NavBar";
import { ChevronLeft, ShoppingCart, Heart, Share2 } from "lucide-react";
import Link from "next/link";

const generateDots = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 30 + 5,
    opacity: Math.random() * 0.3 + 0.1,
  }));
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [mounted, setMounted] = useState(false);
  const [dots] = useState(generateDots(30));
  const productRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(params.id));

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const productRect = productRef.current?.getBoundingClientRect();
    if (productRect) {
      const x = (clientX - productRect.left) / productRect.width;
      const y = (clientY - productRect.top) / productRect.height;
      setMousePosition({ x, y });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Product not found</div>
      </div>
    );
  }

  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 overflow-x-hidden">
      {/* Background effects */}
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          background: `radial-gradient(circle at ${mousePosition.x * 100}% ${
            mousePosition.y * 100
          }%, rgba(249,250,251,0.8) 0%, transparent 60%)`,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Floating background dots */}
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

      <NavBar />

      <main className="relative pt-24" onMouseMove={handleMouseMove}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center text-gray-600"
          >
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <ChevronLeft className="mx-2 h-4 w-4" />
            <span className="text-gray-900">{product.name}</span>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12" ref={productRef}>
            {/* Product Image */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-80 w-full rounded-2xl overflow-hidden bg-white/90 backdrop-blur-lg shadow-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                  priority
                />
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
                <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                  {product.name}
                </h1>
                <p className="text-3xl font-semibold mb-6 text-gray-900">
                  {product.price}
                </p>
                <p className="text-gray-600 mb-8">{product.description}</p>

                {/* Size Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-4">Select Size</h3>
                  <div className="flex gap-4">
                    {sizes.map((size) => (
                      <motion.button
                        key={size}
                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors ${
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-300 hover:border-gray-600"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selection */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium mb-4">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <motion.button
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                    >
                      -
                    </motion.button>
                    <span className="w-12 text-center">{quantity}</span>
                    <motion.button
                      className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <motion.button
                    className="flex-1 bg-black text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Add to wishlist"
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Share product"
                  >
                    <Share2 className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
