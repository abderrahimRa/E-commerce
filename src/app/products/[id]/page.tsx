"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import products from "@/Data/products";
import NavBar from "@/components/ui/NavBar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import BackgroundEffect from "@/components/ui/BackGroundEffect";
import ProductImage from "@/components/ui/ProductImage";
import ProductDetails from "@/components/ui/ProductDetails";
import HomeFooter from "@/components/ui/HomeFooter";
import { StaticImageData } from "next/image";

// Function to generate static paths for each product ID
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(), // Ensure IDs are strings
  }));
}

// Main component
const ProductPage: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [product, setProduct] = useState<{
    id: number;
    name: string;
    price: string;
    description: string;
    image: string | StaticImageData | (string | StaticImageData)[];
  } | null>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const productId = parseInt(id as string);
      const fetchedProduct = products.find((p) => p.id === productId);
      setProduct(fetchedProduct || null);
    }
  }, [id]);

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

  // Ensure product.image is always an array
  const productImages = Array.isArray(product.image)
    ? product.image
    : [product.image as string | StaticImageData];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 overflow-x-hidden">
      <BackgroundEffect mousePosition={mousePosition} />
      <NavBar />
      <main className="relative pt-24 mb-9" onMouseMove={handleMouseMove}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 px-4">
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
};

export default ProductPage;
