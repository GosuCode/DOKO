import React from "react";
import { getProducts } from "./actions";
import Header from "@/app/header";
import { ANProduct } from "@/db/schema";
import ProductWithSidebar from "@/components/all-products/product-with-sidebar";

const ProductListPage = async () => {
  const allProducts: ANProduct[] = await getProducts();
  return (
    <>
      <Header />
      <ProductWithSidebar allProducts={allProducts} />
    </>
  );
};

export default ProductListPage;
