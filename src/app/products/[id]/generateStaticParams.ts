// pages/products/[id]/generateStaticParams.ts
import products from "@/Data/products";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}
