import React, { useState } from "react";
import { ShoppingBag, Heart, Share2 } from "lucide-react";
import Image from "next/image"; // Importing the Image component
import products from "../../Data/products";

const truncateText = (text: string, length: number) => {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
};

const HomeCard = () => {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="text-center mb-16 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
        <h1>Featured Products</h1>
        <div className="w-24 h-1 bg-black dark:bg-white mx-auto mt-4 rounded-full" />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="relative overflow-hidden rounded-xl bg-white   dark:bg-gray-800 p-6 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-blue-500/20 transform hover:-translate-y-2 border-2 border-transparent hover:border-gradient-to-r hover:from-blue-500 hover:to-purple-500">
              {/* Image Container */}
              <div className="relative aspect-square mb-6 overflow-hidden rounded-lg">
                <Image
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  layout="fill" // Ensure the image fills its parent
                  objectFit="cover" // Maintain the aspect ratio
                />

                {/* Floating Action Buttons */}
                <div className="absolute top-4 right-4 space-y-2 opacity-0 transform translate-x-4group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform">
                    <Heart className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                  </button>
                  <button className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:scale-110 transition-transform">
                    <Share2 className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                  </button>
                </div>

                {/* Tags */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-black dark:bg-white text-white dark:text-black rounded-full transform -translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h2>
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {product.price}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400">
                  {expanded[product.id]
                    ? product.description
                    : truncateText(product.description, 100)}
                  <button
                    onClick={() => toggleExpand(product.id)}
                    className="text-blue-500 ml-2"
                  >
                    {expanded[product.id] ? "see less" : "see more"}
                  </button>
                </p>
                <button className="w-full py-3 px-4 cursor-pointer bg-black dark:bg-white text-white dark:text-black  rounded-lg font-medium overflow-hidden relative group/button">
                  <span className="absolute inset-0   opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex h-5 items-center justify-center gap-2">
                    <ShoppingBag className="w-5" />
                    Add to Cart
                  </span>
                </button>
              </div>
              <div className="bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default HomeCard;
