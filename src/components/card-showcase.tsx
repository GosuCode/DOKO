"use client";

import React, { useState } from "react";
import ProductCard from "./product-card";
import FeaturedProductCard from "./featured-product-card";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ANProduct } from "@/db/schema";

interface CardShowcaseProps {
  products: ANProduct[];
}

export default function CardShowcase({ products }: CardShowcaseProps) {
  const [viewMode, setViewMode] = useState<"standard" | "featured">("standard");

  return (
    <div className="w-full space-y-6">
      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4">
        <Button
          variant={viewMode === "standard" ? "default" : "outline"}
          onClick={() => setViewMode("standard")}
          className="px-6"
        >
          Standard Cards
        </Button>
        <Button
          variant={viewMode === "featured" ? "default" : "outline"}
          onClick={() => setViewMode("featured")}
          className="px-6"
        >
          Featured Cards
        </Button>
      </div>

      {/* Card Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.slice(0, 8).map((product, index) => (
          <div key={product.id}>
            {viewMode === "standard" ? (
              <ProductCard product={product} />
            ) : (
              <FeaturedProductCard
                product={product}
                isFeatured={index < 2}
                isTrending={index >= 2 && index < 4}
              />
            )}
          </div>
        ))}
      </div>

      {/* Features Comparison */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="text-center">
            Card Features Comparison
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-lg mb-4 text-purple-800">
                Standard Cards
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Clean, minimal design</li>
                <li>• Subtle hover effects</li>
                <li>• Star ratings display</li>
                <li>• Stock status indicator</li>
                <li>• Discount badges</li>
                <li>• Quick view overlay</li>
                <li>• Wishlist button</li>
                <li>• Responsive grid layout</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-4 text-purple-800">
                Featured Cards
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Enhanced visual appeal</li>
                <li>• Gradient backgrounds</li>
                <li>• Featured/Trending badges</li>
                <li>• Advanced hover animations</li>
                <li>• Larger product images</li>
                <li>• Enhanced typography</li>
                <li>• 3D transform effects</li>
                <li>• Premium button styling</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
