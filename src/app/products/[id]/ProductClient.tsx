// pages/products/[id]/ProductClient.tsx
"use client";
import React, { useState, useRef } from "react";
import { StaticImageData } from "next/image";
import NavBar from "@/components/ui/NavBar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import BackgroundEffect from "@/components/ui/BackGroundEffect";
import ProductImage from "@/components/ui/ProductImage";
import ProductDetails from "@/components/ui/ProductDetails";
import HomeFooter from "@/components/ui/HomeFooter";

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string | StaticImageData | (string | StaticImageData)[];
}

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const productRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const productRect = productRef.current?.getBoundingClientRect();
    if (productRect) {
      const x = (clientX - productRect.left) / productRect.width;
      const y = (clientY - productRect.top) / productRect.height;
      setMousePosition({ x, y });
    }
  };

  // Ensure product.image is always an array
  const productImages = Array.isArray(product.image)
    ? product.image
    : [product.image as string | StaticImageData];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 overflow-x-hidden">
      <BackgroundEffect mousePosition={mousePosition} />
      <NavBar />
      <main className="relative pt-24 mb-9" onMouseMove={handleMouseMove}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 px-4">
          <div className="mb-6 flex items-center text-gray-600">
            <Link href="/" className="hover:text-gray-900 transition-colors">
              Home
            </Link>
            <ChevronLeft className="mx-2 h-4 w-4" />
            <span className="text-gray-900">{product.name}</span>
          </div>
          <div className="flex flex-col lg:flex-row gap-12" ref={productRef}>
            <ProductImage images={productImages} name={product.name} />
            <ProductDetails
              name={product.name}
              price={product.price}
              description={product.description}
            />
          </div>
        </div>
      </main>
      <footer>
        <HomeFooter />
      </footer>
    </div>
  );
}
