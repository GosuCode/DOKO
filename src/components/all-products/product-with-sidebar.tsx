"use client";

import React, { useState } from "react";
import ProductCard from "@/components/product-card";
import { ANProduct } from "@/db/schema";
import ProductSidebar from "./product-sidebar";
import PageContainer from "../dashboard/layout/page-container";

interface AllProductsProps {
  allProducts: ANProduct[];
}

const ProductWithSidebar = ({ allProducts }: AllProductsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);

  const applyFilters = () => {
    let newFilteredProducts = allProducts.filter((product) => {
      const categoryMatch = selectedCategory
        ? product.categories === selectedCategory
        : true;
      const priceMatch = selectedPrice
        ? selectedPrice === "low"
          ? true
          : product.price >= 50
        : true;
      return categoryMatch && priceMatch;
    });

    if (selectedPrice === "low") {
      newFilteredProducts = newFilteredProducts.sort(
        (a, b) => a.price - b.price
      );
    } else if (selectedPrice === "high") {
      newFilteredProducts = newFilteredProducts.sort(
        (a, b) => b.price - a.price
      );
    }

    setFilteredProducts(newFilteredProducts);
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedPrice(null);
    setFilteredProducts(allProducts);
  };
  return (
    <div className="flex">
      <ProductSidebar
        setSelectedCategory={setSelectedCategory}
        setSelectedPrice={setSelectedPrice}
        clearFilters={clearFilters}
        applyFilters={applyFilters}
      />
      <PageContainer scrollable={true}>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 sm:space-x-2 space-y-4 mt-20 w-full overflow-hidden flex-1">
          {filteredProducts.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </PageContainer>
    </div>
  );
};

export default ProductWithSidebar;
