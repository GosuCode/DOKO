import React from "react";
import SingleProductCard from "./single-product-card";
import { ANProduct } from "@/db/schema";

const YourProductComponent = ({ product }: { product: ANProduct }) => {
  return <SingleProductCard key={product.id} product={product} />;
};

export default YourProductComponent;
