import React from "react";
import { database } from "@/db/database";
import { products } from "@/db/schema";
import SingleProductCard from "@/components/single-product-card";

const ProductList = async () => {
  const allProducts = await database.select().from(products);
  return (
    <div className="grid grid-cols-4 gap-4">
      {allProducts.map((product) => (
        <SingleProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
