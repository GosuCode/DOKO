import React from "react";
import { database } from "@/db/database";
import { products } from "@/db/schema";
import SingleProductCard from "@/components/single-product-card";
import Link from "next/link";

const ProductList = async () => {
  const allProducts = await database.select().from(products);
  return (
    <div className="grid grid-cols-4 gap-4">
      {allProducts.map((product) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <SingleProductCard product={product} />
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
