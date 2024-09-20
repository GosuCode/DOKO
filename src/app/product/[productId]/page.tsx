import ProductSection from "@/components/Product-By-Id/product-section";
import { database } from "@/db/database";
import { eq } from "drizzle-orm";
import { ANProduct, products } from "@/db/schema";
import Header from "@/app/header";

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
    <>
      <Header />
      <ProductSection product={product as ANProduct} />
    </>
  );
}
