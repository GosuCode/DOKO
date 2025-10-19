import React from "react";
import { getProducts } from "./actions";
import Header from "@/app/header";
import { ANProduct } from "@/db/schema";
import ProductWithSidebar from "@/components/all-products/product-with-sidebar";
import EmptyComponent from "@/components/empty-page";

const ProductListPage = async () => {
  const allProducts: ANProduct[] = await getProducts();

  if (!allProducts || allProducts.length === 0) {
    return (
      <>
        <Header />
        <EmptyComponent
          pageName="list"
          btnName="List new Product"
          link="/dashboard/products/create"
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />
      <ProductWithSidebar allProducts={allProducts} />
    </div>
  );
};

export default ProductListPage;
