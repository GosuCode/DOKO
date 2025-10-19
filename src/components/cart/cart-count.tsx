"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CartCount() {
  const { data: session } = useSession();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (session?.user) {
      fetchCartCount();
    }
  }, [session]);

  const fetchCartCount = async () => {
    try {
      const response = await fetch("/api/cart/count");
      if (response.ok) {
        const data = await response.json();
        setCartCount(data.count);
      }
    } catch (error) {
      console.error("Failed to fetch cart count:", error);
    }
  };

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  if (!session?.user) {
    return null;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative text-gray-600 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200"
      asChild
    >
      <Link href="/product/cart">
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
