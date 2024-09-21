"use client";

import React from "react";
import ProductCard from "@/components/product-card";
import { ANProduct } from "@/db/schema";

interface AllProductsProps {
  allProducts: ANProduct[];
}

const AllProducts = ({ allProducts }: AllProductsProps) => {
  return (
    <>
      {allProducts.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </>
  );
};

export default AllProducts;
