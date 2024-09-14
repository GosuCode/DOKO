import React from "react";
import SingleProductCard from "@/components/single-product-card";
import { getProducts } from "./actions";

const ProductList = async () => {
  const allProducts = await getProducts();
  return (
    <div className="grid grid-cols-4 gap-4">
      {allProducts.map((product) => (
        <SingleProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default ProductList;
