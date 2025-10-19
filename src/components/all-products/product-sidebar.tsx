"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { SlidersHorizontal, X } from "lucide-react";

type SidebarProps = {
  setSelectedCategory: (category: string | null) => void;
  setSelectedPrice: (price: string | null) => void;
  applyFilters: () => void;
  clearFilters: () => void;
  isMobile?: boolean;
};

export default function ProductSidebar({
  setSelectedCategory,
  setSelectedPrice,
  applyFilters,
  clearFilters,
  isMobile = false,
}: SidebarProps) {
  const categories = [
    "All Products",
    "Clothing",
    "Accessories",
    "Home Decor",
    "Jewelry",
    "Art & Crafts",
    "Textiles",
    "Pottery",
  ];

  const priceRanges = [
    { label: "Under Rs. 500", value: "under-500" },
    { label: "Rs. 500 - Rs. 1000", value: "500-1000" },
    { label: "Rs. 1000 - Rs. 2000", value: "1000-2000" },
    { label: "Rs. 2000 - Rs. 5000", value: "2000-5000" },
    { label: "Above Rs. 5000", value: "above-5000" },
  ];

  return (
    <aside
      className={cn(
        isMobile
          ? "w-full p-6"
          : "relative hidden h-screen flex-none border-r bg-white/80 backdrop-blur-sm transition-[width] duration-500 lg:block w-80"
      )}
    >
      {!isMobile && (
        <div className="p-6 pt-8">
          <Link href={"/"} className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              height="40"
              width="40"
              alt="Logo"
              className="object-contain"
            />
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Artisan Nepal
              </h3>
              <p className="text-sm text-gray-600">Handmade with Love</p>
            </div>
          </Link>
        </div>
      )}

      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-amber-600" />
            Filters
          </h2>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => {}}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Categories */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-800">Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    category === "All Products" ? null : category
                  )
                }
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-amber-50 transition-colors duration-200 text-gray-700 hover:text-amber-600"
              >
                {category}
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Price Range */}
        <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-800">Price Range</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {priceRanges.map((range) => (
              <label
                key={range.value}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="price"
                  value={range.value}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="w-4 h-4 text-amber-600 focus:ring-amber-500"
                />
                <span className="text-gray-700">{range.label}</span>
              </label>
            ))}
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-0 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-800">
              Why Choose Us
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center">
                <span className="text-amber-600 text-sm">✓</span>
              </div>
              <span className="text-sm text-gray-700">100% Handmade</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center">
                <span className="text-amber-600 text-sm">✓</span>
              </div>
              <span className="text-sm text-gray-700">
                Authentic Craftsmanship
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-600/20 rounded-full flex items-center justify-center">
                <span className="text-amber-600 text-sm">✓</span>
              </div>
              <span className="text-sm text-gray-700">Fair Trade</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={applyFilters}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 hover:scale-105"
          >
            Apply Filters
          </Button>
          <Button
            variant="outline"
            onClick={clearFilters}
            className="w-full border-amber-300 text-amber-600 hover:bg-amber-50 font-semibold py-2.5 rounded-xl transition-all duration-300"
          >
            Clear All
          </Button>
        </div>
      </div>
    </aside>
  );
}
