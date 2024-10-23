"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Truck, User, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const CheckoutForm = () => {
    const router = useRouter();
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        zipCode: "",
        cardNumber: "",
        cardName: "",
        expiry: "",
        cvv: "",
    });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const x = clientX / window.innerWidth;
            const y = clientY / window.innerHeight;
            setMousePosition({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const steps = [
        { number: 1, title: "Personal Info", icon: User },
        { number: 2, title: "Shipping", icon: Truck },
        { number: 3, title: "Payment", icon: CreditCard },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
            {isMounted && (
                <motion.div
                    className="fixed inset-0 z-0"
                    animate={{
                        background: [
                            `radial-gradient(circle at ${mousePosition.x * 100}% ${
                                mousePosition.y * 100
                            }%, rgba(249,250,251,0.8) 0%, transparent 60%),
                                                                                                        linear-gradient(to bottom right, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.05) 100%)`,
                            `radial-gradient(circle at ${(mousePosition.x + 0.1) * 100}% ${
                                (mousePosition.y + 0.1) * 100
                            }%, rgba(249,250,251,0.8) 0%, transparent 60%),
                                                                                                        linear-gradient(to bottom right, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0.06) 100%)`,
                        ],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
            )}

            <div className="max-w-4xl mx-auto px-4 py-16 relative z-10">
                <div className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group mb-6"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Previous Page
                    </button>
                    <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                        <Lock className="w-8 h-8" />
                        Secure Checkout
                    </h1>
                </div>

                <div className="flex justify-between mb-12">
                    {steps.map((step, index) => (
                        <div key={step.number} className="flex items-center">
                            <div
                                className={`flex flex-col items-center ${
                                    index !== steps.length - 1 ? "w-full" : ""
                                }`}
                            >
                                <div
                                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                        currentStep >= step.number
                                            ? "bg-black text-white"
                                            : "bg-gray-200 text-gray-500"
                                    }`}
                                >
                                    <step.icon className="w-5 h-5" />
                                </div>
                                <span className="mt-2 text-sm font-medium text-gray-600">
                                    {step.title}
                                </span>
                                {index !== steps.length - 1 && (
                                    <div
                                        className={`h-1 w-full mt-4 ${
                                            currentStep > step.number ? "bg-black" : "bg-gray-200"
                                        }`}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/90 backdrop-blur-lg rounded-xl p-8 shadow-xl"
                >
                    <form className="space-y-8">
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold mb-6">
                                    Personal Information
                                </h2>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold mb-6">
                                    Shipping Information
                                </h2>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Street Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            ZIP Code
                                        </label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Country
                                    </label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        <option value="">Select Country</option>
                                        <option value="US">United States</option>
                                        <option value="UK">United Kingdom</option>
                                        <option value="CA">Canada</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold mb-6">
                                    Payment Information
                                </h2>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Card Number
                                    </label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cardholder Name
                                    </label>
                                    <input
                                        type="text"
                                        name="cardName"
                                        value={formData.cardName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Expiry Date
                                        </label>
                                        <input
                                            type="text"
                                            name="expiry"
                                            placeholder="MM/YY"
                                            value={formData.expiry}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            CVV
                                        </label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                                    currentStep === 1
                                        ? "opacity-50 cursor-not-allowed"
                                        : "hover:bg-gray-100"
                                }`}
                                disabled={currentStep === 1}
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (currentStep < 3) {
                                        setCurrentStep(currentStep + 1);
                                    } else {
                                        // Handle form submission
                                        console.log("Form submitted:", formData);
                                    }
                                }}
                                className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition-all duration-300"
                            >
                                {currentStep === 3 ? "Place Order" : "Next"}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default CheckoutForm;
