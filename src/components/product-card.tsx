"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Check, ImageIcon, Star, Heart, ShoppingCart, Eye } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { createCartAction } from "@/app/product/[productId]/actions";
import { useTransition } from "react";

import type { ANProduct } from "@/db/schema";
import { cn } from "@/lib/utils";
import DisplayImage from "./display-image";

type ProductCardProps = {
  product: ANProduct;
  isAddedToCart?: boolean;
  onSwitch?: () => Promise<void>;
  viewMode?: "grid" | "list";
};

export default function ProductCard({
  product,
  isAddedToCart = false,
  viewMode = "grid",
}: ProductCardProps) {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const subtotal = Math.round(
    product.price - (product.price * product.discount) / 100
  );
  const image_public_id = product.image;

  const handleAddToCart = async () => {
    if (!session?.user) {
      toast({
        title: "Login Required",
        description: "Please sign in to add items to your cart.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      const formData = new FormData();
      formData.append("quantity", "1");

      const result = await createCartAction(product.id, formData);

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    });
  };

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

  if (viewMode === "list") {
    return (
      <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 hover:-translate-y-1">
        <div className="flex">
          {/* Product Image */}
          <Link
            aria-label={`View ${product.name} details`}
            href={`/product/${product.id}`}
            className="block flex-shrink-0"
          >
            <div className="relative w-48 h-48 overflow-hidden rounded-l-2xl">
              {product.image ? (
                <DisplayImage
                  public_id={image_public_id}
                  alt={product.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div
                  className="flex size-full items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50"
                  role="img"
                  aria-label="Placeholder"
                >
                  <ImageIcon className="size-12 text-amber-400" />
                </div>
              )}
            </div>
          </Link>

          {/* Product Info */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <Link href={`/product/${product.id}`} className="block flex-1">
                  <h3 className="font-bold text-gray-800 group-hover:text-amber-600 transition-colors duration-300 text-xl leading-tight">
                    {product.name}
                  </h3>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors duration-200" />
                </Button>
              </div>

              {/* Rating */}
              {product.avgRating && product.avgRating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {renderStars(product.avgRating)}
                  </div>
                  <span className="text-sm text-gray-500 font-medium">
                    ({product.avgRating})
                  </span>
                </div>
              )}

              <p className="text-gray-600 line-clamp-2">
                {product.description ||
                  "Handcrafted with traditional techniques and authentic materials."}
              </p>

              {/* Price and Stock */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                  {product.discount > 0 && (
                    <span className="text-sm text-gray-500 line-through font-medium">
                      Rs. {product.price.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-3 w-3 rounded-full shadow-sm",
                      product.quantity > 0 ? "bg-green-500" : "bg-red-500"
                    )}
                  />
                  <span className="text-sm text-gray-600 font-medium">
                    {product.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              size="default"
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg hover:shadow-xl"
              disabled={product.quantity === 0 || isPending}
              onClick={handleAddToCart}
            >
              {isPending ? (
                <>
                  <ShoppingCart className="mr-2 h-5 w-5 animate-spin" />
                  Adding...
                </>
              ) : isAddedToCart ? (
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
      </div>
    );
  }

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 hover:-translate-y-2">
      {/* Discount Badge */}
      {product.discount > 0 && (
        <Badge className="absolute top-4 left-4 z-10 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-3 py-1 rounded-full shadow-lg">
          {product.discount}% OFF
        </Badge>
      )}

      {/* Wishlist Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
      >
        <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors duration-200" />
      </Button>

      {/* Product Image */}
      <Link
        aria-label={`View ${product.name} details`}
        href={`/product/${product.id}`}
        className="block"
      >
        <div className="relative overflow-hidden rounded-t-2xl">
          <AspectRatio ratio={4 / 3}>
            {product.image ? (
              <DisplayImage
                public_id={image_public_id}
                alt={product.name}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div
                className="flex size-full items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50"
                role="img"
                aria-label="Placeholder"
              >
                <ImageIcon className="size-12 text-amber-400" />
              </div>
            )}
          </AspectRatio>

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              size="sm"
              className="bg-white/95 hover:bg-white text-gray-800 font-semibold px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
          <h3 className="font-bold text-gray-800 line-clamp-2 group-hover:text-amber-600 transition-colors duration-300 text-lg leading-tight">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.avgRating && product.avgRating > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {renderStars(product.avgRating)}
            </div>
            <span className="text-sm text-gray-500 font-medium">
              ({product.avgRating})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Rs. {subtotal.toLocaleString()}
          </span>
          {product.discount > 0 && (
            <span className="text-sm text-gray-500 line-through font-medium">
              Rs. {product.price.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-3 w-3 rounded-full shadow-sm",
              product.quantity > 0 ? "bg-green-500" : "bg-red-500"
            )}
          />
          <span className="text-sm text-gray-600 font-medium">
            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          size="default"
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg hover:shadow-xl"
          disabled={product.quantity === 0 || isPending}
          onClick={handleAddToCart}
        >
          {isPending ? (
            <>
              <ShoppingCart className="mr-2 h-5 w-5 animate-spin" />
              Adding...
            </>
          ) : isAddedToCart ? (
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
