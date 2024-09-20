import React from "react";
import { getProducts } from "./actions";
import ProductCard from "@/components/product-card";
import Header from "@/app/header";

const ProductList = async () => {
  const allProducts = await getProducts();
  return (
    <>
      <Header />
      <div className="grid grid-cols-4 gap-4 mt-20">
        {allProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default ProductList;
