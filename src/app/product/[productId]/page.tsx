import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import React from "react";
import { database } from "@/db/database";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DisplayImage from "@/components/display-image";
import { Card } from "@/components/ui/card";
import QuantityInput from "@/components/quantity-input";
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
    <main>
      <Card className="grid grid-cols-3 space-x-4 justify-between max-h-[50vh]">
        <div className="relative w-[400px] h-[400px] bg-slate-300">
          <figure>
            <DisplayImage public_id={product.image} />
          </figure>
        </div>
        <div className="flex grid-cols-2 col-span-2 p-4">
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="text-xl space-y-4">
              <div>
                <span className="font-bold">{product.price}</span>
              </div>
              <div>
                Rs.<span className="font-bold">{product.price}</span>
              </div>
              <QuantityInput productId={parseInt(productId)} />
            </div>
          </div>
        </div>
      </Card>
      <div>
        <h2 className="text-2xl font-bold">Description</h2>
        <p>{product.description}</p>
      </div>
    </main>
  );
};

export default ProductById;
