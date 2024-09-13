import React from "react";
import SingleProductCard from "./single-product-card";
import { ANProduct } from "@/db/schema";

const YourProductComponent = ({ product }: { product: ANProduct }) => {
  return (
    <div className="container grid grid-cols-4 gap-4">
      <SingleProductCard key={product.id} product={product} />
    </div>
  );
};

export default YourProductComponent;
