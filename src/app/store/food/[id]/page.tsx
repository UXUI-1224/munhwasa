import { notFound } from "next/navigation";
import { PRODUCTS, PRODUCTS_BY_CATEGORY } from "@/data/products";
import ProductDetailPage from "@/components/ProductDetailPage";

export function generateStaticParams() {
  return PRODUCTS_BY_CATEGORY.food.map((p) => ({ id: p.id }));
}

type Props = { params: Promise<{ id: string }> };

export default async function FoodDetailPage({ params }: Props) {
  const { id } = await params;
  const product = PRODUCTS[id];
  if (!product || product.category !== "food") notFound();
  return <ProductDetailPage product={product} />;
}
