"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  MinusCircle,
  PlusCircle,
  Trash2,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import products from "@/Data/products";
import BackgroundEffect from "@/components/ui/BackGroundEffect";

const Page = () => {
  const [cartItems, setCartItems] = useState<
    {
      id: number;
      name: string;
      price: string;
      image: StaticImageData;
      description: string;
      tags?: string[];
      quantity: number;
    }[]
  >([
    {
      ...products[0],
      quantity: 1,
    },
    {
      ...products[1],
      quantity: 2,
    },
  ]);

  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price.replace("$", ""));
      return sum + price * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = 9.99;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 relative">
      <BackgroundEffect mousePosition={mousePosition} />
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 relative z-10">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8" />
            Your Cart
          </h1>
        </div>

        {/* Cart Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative overflow-hidden rounded-xl bg-white/90 backdrop-blur-lg p-6 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-blue-500/20 transform hover:-translate-y-1 border-2 border-transparent hover:border-gradient-to-r hover:from-blue-500 hover:to-purple-500"
              >
                <div className="flex items-center gap-6">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <div className="flex gap-2 mt-2">
                          {item.tags?.map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xl font-semibold text-gray-900">
                        {item.price}
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <MinusCircle className="w-6 h-6" />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <PlusCircle className="w-6 h-6" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl bg-white/90 backdrop-blur-lg p-6 h-fit shadow-xl"
          >
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-200" />
              <div className="flex justify-between text-xl font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="w-full py-4 px-6 mt-6 bg-black text-white rounded-lg font-medium overflow-hidden relative group/button hover:shadow-lg transition-all duration-300">
                <span className="absolute inset-0 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Proceed to Checkout
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Page;