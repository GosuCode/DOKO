"use client";

import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createCartAction } from "@/app/product/[productId]/actions";

const QuantityInput = ({ productId }: { productId: number }) => {
  const handleSubmit = (formData: FormData) => {
    createCartAction(productId, formData);
  };
  return (
    <form action={handleSubmit}>
      <div className="flex items-center gap-2">
        Quantity
        <Button>-</Button>
        <Input
          type="number"
          max={10}
          min={1}
          defaultValue={1}
          name="quantity"
        />
        <Button>+</Button>
      </div>
      <div className="flex justify-between">
        <Button className="w-full">Buy Now</Button>
        <Button className="w-full">Add to Cart</Button>
      </div>
    </form>
  );
};

export default QuantityInput;
