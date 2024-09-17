import ProductSection from "@/components/Product-By-Id/product-section";
import { database } from "@/db/database";
import { eq } from "drizzle-orm";
import { ANProduct, products } from "@/db/schema";
import { Card } from "@/components/ui/card";

type ProductPageProps = {
  params: { productId: string };
};
export default async function ProductPage({
  params: { productId },
}: ProductPageProps) {
  const product = await database.query.products.findFirst({
    where: eq(products.id, parseInt(productId)),
  });
  return (
    <Card className="min-h-screen py-12 sm:pt-20">
      <ProductSection product={product as ANProduct} />
      <section className="container mt-10 p-10 w-3/5 mx-auto bg-gray-100 rounded-md">
        {product?.description}
      </section>
    </Card>
  );
}
