import React from "react";
import { getProducts } from "./actions";
import Header from "@/app/header";
import { ANProduct } from "@/db/schema";
import ProductWithSidebar from "@/components/all-products/product-with-sidebar";
import EmptyComponent from "@/components/empty-page";

const ProductListPage = async () => {
  const allProducts: ANProduct[] = await getProducts();

  if (!allProducts) {
    return (
      <EmptyComponent
        pageName="list"
        btnName="List new Proudct"
        link="/dashboard/products/create"
      />
    );
  }
  return (
    <>
      <Header />
      <ProductWithSidebar allProducts={allProducts} />
    </>
  );
};

export default ProductListPage;
