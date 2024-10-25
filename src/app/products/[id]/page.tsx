// pages/products/[id]/page.tsx
import { generateStaticParams } from "./generateStaticParams";
import ProductClient from "./ProductClient";
import products from "@/Data/products";

// This is the server component
export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === parseInt(params.id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Product not found</div>
      </div>
    );
  }

  return <ProductClient product={product} />;
}

// This enables static site generation for the dynamic routes
export { generateStaticParams };
