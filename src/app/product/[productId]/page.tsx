import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import React from "react";
import { database } from "@/db/database";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SingleProductCard from "@/components/single-product-card";
const ProductById = async ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const product = await database.query.products.findFirst({
    where: eq(products.id, parseInt(productId)),
  });

  if (!product) {
    return (
      <div className="space-y-8 flex flex-col items-center justify-center">
        <Image src="/empty-state.svg" width="200" height="200" alt="Package" />
        <h2 className="text-2xl font-bold">You have no products yet</h2>
        <Button asChild>
          <Link href="/product/">View Products</Link>
        </Button>
      </div>
    );
  }
  return (
    <div>
      <SingleProductCard product={product} />
    </div>
  );
};

export default ProductById;
