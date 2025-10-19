"use client";

import { X, Plus, Minus, Heart } from "lucide-react";
import Link from "next/link";
import { ANCartWithProduct } from "@/db/schema";
import DisplayImage from "../display-image";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { removeProductFromCart } from "@/app/product/cart/actions";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

function CartTable({ cart }: { cart: ANCartWithProduct[] }) {
  const { toast } = useToast();
  const [quantities, setQuantities] = useState<Record<number, number>>(
    cart.reduce(
      (acc, item) => ({ ...acc, [item.productId]: item.quantity }),
      {}
    )
  );

  const handleRemoveItem = async (productId: number) => {
    try {
      await removeProductFromCart(productId);
      toast({
        title: "Item removed",
        description: "Product has been removed from your cart.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive",
      });
    }
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));
  };

  return (
    <div className="space-y-4">
      {cart.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-4 p-4 bg-white/50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
        >
          {/* Product Image */}
          <Link href={`/product/${item.productId}`} className="flex-shrink-0">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
              <DisplayImage
                public_id={item.products.image}
                alt={item.products.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              />
            </div>
          </Link>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <Link
              href={`/product/${item.productId}`}
              className="block hover:text-amber-600 transition-colors duration-200"
            >
              <h3 className="font-semibold text-gray-800 text-lg line-clamp-2 mb-1">
                {item.products.name}
              </h3>
            </Link>

            <div className="flex items-center gap-2 mb-2">
              <Badge
                variant="secondary"
                className="bg-amber-100 text-amber-800 text-xs"
              >
                {item.products.categories}
              </Badge>
              {item.products.discount > 0 && (
                <Badge variant="destructive" className="text-xs">
                  {item.products.discount}% OFF
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Stock: {item.products.quantity}</span>
              <span>•</span>
              <span>SKU: #{item.productId}</span>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                handleQuantityChange(
                  item.productId,
                  quantities[item.productId] - 1
                )
              }
              disabled={quantities[item.productId] <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">
              {quantities[item.productId]}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                handleQuantityChange(
                  item.productId,
                  quantities[item.productId] + 1
                )
              }
              disabled={quantities[item.productId] >= item.products.quantity}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* Price */}
          <div className="text-right min-w-0">
            <div className="text-lg font-bold text-gray-800">
              Rs.{" "}
              {(item.subtotal * quantities[item.productId]).toLocaleString()}
            </div>
            {item.products.discount > 0 && (
              <div className="text-sm text-gray-500 line-through">
                Rs.{" "}
                {(
                  item.products.price * quantities[item.productId]
                ).toLocaleString()}
              </div>
            )}
            <div className="text-xs text-gray-500">
              Rs. {item.subtotal.toLocaleString()} each
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-red-500 hover:border-red-200"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-red-500 hover:border-red-200"
              onClick={() => handleRemoveItem(item.productId)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartTable;
