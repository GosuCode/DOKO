import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EmptyCart = () => {
  return (
    <div className="space-y-8 flex flex-col items-center justify-center">
      <Image src="/empty-state.svg" width="200" height="200" alt="Package" />
      <h2 className="text-2xl font-bold">Your cart is empty.</h2>
      <Button asChild>
        <Link href="/product/product-list">Add Product</Link>
      </Button>
    </div>
  );
};

export default EmptyCart;
