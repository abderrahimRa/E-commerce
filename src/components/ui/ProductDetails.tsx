import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import Link from "next/link";

interface ProductDetailsProps {
  name: string;
  price: string;
  description: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  name,
  price,
  description,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <motion.div
      className="lg:w-1/2 relative h-full"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl h-full min-h-[600px] flex flex-col">
        {/* Product Info Section */}
        <div className="flex-none">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            {name}
          </h1>
          <p className="text-3xl font-semibold mb-6 text-gray-900">{price}</p>
          <p className="text-gray-600 mb-8">{description}</p>
        </div>

        {/* Options Section */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Size Selection */}
          <div className="mb-8">
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
        </div>

        {/* Action Buttons Section */}
        <div className="flex-none">
          <div className="flex gap-4">
            <Link
              href="/ShoppingForm"
              className="flex-1 bg-black text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
            >
              Buy Now
            </Link>

            <motion.button
              className="flex-1 bg-black text-white px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-gray-900 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingCart className="w-5 h-5" />
              Add
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
      </div>
    </motion.div>
  );
};

export default ProductDetails;
