"use client";

import { ArrowRight, CreditCard, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { checkout } from "@/app/product/cart/actions";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

function CheckOutButton({ cartItemIds }: { cartItemIds: number[] }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const result = await checkout(cartItemIds);
      if (result.success) {
        toast({
          title: "Order Placed Successfully!",
          description: `Your order #${result.orderId} has been confirmed.`,
        });
      }
    } catch (error) {
      toast({
        title: "Checkout Failed",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button
        onClick={handleClick}
        disabled={isLoading}
        aria-label="checkout-products"
        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          "Processing..."
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Proceed to Checkout
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
        <Shield className="h-3 w-3" />
        <span>Secure checkout with SSL encryption</span>
      </div>
    </div>
  );
}

export default CheckOutButton;
