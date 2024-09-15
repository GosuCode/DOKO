import ProductSection from "@/components/Product-By-Id/product-section";
import { database } from "@/db/database";
import { eq } from "drizzle-orm";
import { ANProduct, products } from "@/db/schema";

export default async function ProductPage({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const product = await database.query.products.findFirst({
    where: eq(products.id, parseInt(productId)),
  });
  return (
    <div className="min-h-screen py-12 sm:pt-20">
      <ProductSection product={product as ANProduct} />
    </div>
  );
}
