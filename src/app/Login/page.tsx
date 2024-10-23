"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Facebook,
  MailPlus,
} from "lucide-react";
import { useRouter } from "next/navigation";

const generateDots = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 30 + 5,
    opacity: Math.random() * 0.3 + 0.1,
  }));
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mounted] = useState(true);
  const [dots] = useState(generateDots(30));
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    setMousePosition({ x, y });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin/dashboard");
    }, 1500);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center"
      onMouseMove={handleMouseMove}
    >
      {/* Background Effects */}
      <motion.div
        className="fixed inset-0 z-0"
        animate={{
          background: [
            `radial-gradient(circle at ${mousePosition.x * 100}% ${
              mousePosition.y * 100
            }%, rgba(249,250,251,0.8) 0%, transparent 60%)`,
            `radial-gradient(circle at ${(mousePosition.x + 0.1) * 100}% ${
              (mousePosition.y + 0.1) * 100
            }%, rgba(249,250,251,0.8) 0%, transparent 60%)`,
          ],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
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

      {/* Login Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold mb-2"
            >
              Welcome Back
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600"
            >
              Sign in to access your admin dashboard
            </motion.p>
          </div>

          {/* Social Login Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 gap-4 mb-6"
          >
            <button className="flex items-center justify-center gap-2 p-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <MailPlus className="w-5 h-5" />
              <span>Gmail</span>
            </button>
            <button className="flex items-center justify-center gap-2 p-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-300">
              <Facebook className="w-5 h-5" />
              <span>Facebook</span>
            </button>
          </motion.div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/90 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-200 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-200 transition-colors"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-[400ms] ease-out group-hover:w-full"></span>
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </motion.button>
          </form>

         
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-8 text-center text-sm text-gray-600"
          >
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign up now
            </a>
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
