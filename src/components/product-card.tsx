"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Check, ImageIcon, Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

import type { ANProduct } from "@/db/schema";
import { cn } from "@/lib/utils";
import DisplayImage from "./display-image";

type ProductCardProps = {
  product: ANProduct;
  isAddedToCart?: boolean;
  onSwitch?: () => Promise<void>;
};

export default function ProductCard({
  product,
  isAddedToCart = false,
  onSwitch,
}: ProductCardProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const subtotal = Math.round(
    product.price - (product.price * product.discount) / 100
  );
  const image_public_id = product.image;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-3 w-3",
          i < Math.floor(rating || 0)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200">
      {/* Discount Badge */}
      {product.discount > 0 && (
        <Badge
          variant="destructive"
          className="absolute top-3 left-3 z-10 bg-red-500 hover:bg-red-600 text-white font-semibold"
        >
          {product.discount}% OFF
        </Badge>
      )}

      {/* Wishlist Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 h-8 w-8 rounded-full bg-white/80 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
      </Button>

      {/* Product Image */}
      <Link
        aria-label={`View ${product.name} details`}
        href={`/product/${product.id}`}
        className="block"
      >
        <div className="relative overflow-hidden">
          <AspectRatio ratio={4 / 3}>
            {product.image ? (
              <DisplayImage
                public_id={image_public_id}
                alt={product.name}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div
                className="flex size-full items-center justify-center bg-gray-50"
                role="img"
                aria-label="Placeholder"
              >
                <ImageIcon className="size-12 text-gray-400" />
              </div>
            )}
          </AspectRatio>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/90 hover:bg-white text-gray-800 font-medium"
            >
              <Eye className="mr-2 h-4 w-4" />
              Quick View
            </Button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.avgRating && product.avgRating > 0 && (
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {renderStars(product.avgRating)}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.avgRating})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-purple-800">
            Rs. {subtotal.toLocaleString()}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-500 line-through">
              Rs. {product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              product.quantity > 0 ? "bg-green-500" : "bg-red-500"
            )}
          />
          <span className="text-xs text-gray-600">
            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          size="default"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!onSwitch || product.quantity === 0}
          onClick={() => {
            if (!session?.user) {
              toast({
                title: "Login Required",
                description: "Please sign in to add items to your cart.",
                variant: "destructive",
              });
              return;
            }
            onSwitch?.();
          }}
        >
          {isAddedToCart ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
