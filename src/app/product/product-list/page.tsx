import React from "react";
import { getProducts } from "./actions";
import ProductCard from "@/components/product-card";
import Header from "@/app/header";

const ProductList = async () => {
  const allProducts = await getProducts();
  return (
    <>
      <Header />
      <div className="grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 sm:space-x-2 space-y-4 mt-20">
        {allProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
