"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Check,
  ImageIcon,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

import type { ANProduct } from "@/db/schema";
import { cn } from "@/lib/utils";
import DisplayImage from "./display-image";

type FeaturedProductCardProps = {
  product: ANProduct;
  isAddedToCart?: boolean;
  onSwitch?: () => Promise<void>;
  isFeatured?: boolean;
  isTrending?: boolean;
};

export default function FeaturedProductCard({
  product,
  isAddedToCart = false,
  onSwitch,
  isFeatured = false,
  isTrending = false,
}: FeaturedProductCardProps) {
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
    <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-purple-300 transform hover:-translate-y-1">
      {/* Special Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isFeatured && (
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md">
            <Sparkles className="mr-1 h-3 w-3" />
            Featured
          </Badge>
        )}
        {isTrending && (
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow-md">
            <TrendingUp className="mr-1 h-3 w-3" />
            Trending
          </Badge>
        )}
        {product.discount > 0 && (
          <Badge
            variant="destructive"
            className="bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold shadow-md"
          >
            {product.discount}% OFF
          </Badge>
        )}
      </div>

      {/* Wishlist Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-3 right-3 z-10 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors duration-200" />
      </Button>

      {/* Product Image */}
      <Link
        aria-label={`View ${product.name} details`}
        href={`/product/${product.id}`}
        className="block"
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
          <AspectRatio ratio={4 / 3}>
            {product.image ? (
              <DisplayImage
                public_id={image_public_id}
                alt={product.name}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div
                className="flex size-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200"
                role="img"
                aria-label="Placeholder"
              >
                <ImageIcon className="size-16 text-gray-400" />
              </div>
            )}
          </AspectRatio>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/95 hover:bg-white text-gray-800 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <Eye className="mr-2 h-4 w-4" />
              Quick View
            </Button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200 text-lg leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.avgRating && product.avgRating > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {renderStars(product.avgRating)}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {product.avgRating.toFixed(1)} (
              {Math.floor(Math.random() * 100) + 1} reviews)
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-purple-800">
            Rs. {subtotal.toLocaleString()}
          </span>
          {product.discount > 0 && (
            <span className="text-lg text-gray-500 line-through">
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
          <span className="text-sm text-gray-600 font-medium">
            {product.quantity > 0
              ? `${product.quantity} in stock`
              : "Out of Stock"}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          size="lg"
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
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
              <Check className="mr-2 h-5 w-5" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
