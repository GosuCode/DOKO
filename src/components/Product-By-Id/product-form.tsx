"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { createCartAction } from "@/app/product/[productId]/actions";
import toast, { Toaster } from "react-hot-toast";

function ProductForm({ productId }: { productId: number }) {
  const handleSubmit = (formData: FormData) => {
    createCartAction(productId, formData);
    toast.success("Added to cart successfully.");
  };

  return (
    <>
      <Toaster />
      <form action={handleSubmit} className="w-full">
        <div className="flex justify-start space-x-2 w-full">
          <div className="flex flex-col items-start space-y-1 flex-grow-0">
            <label className="text-gray-500 text-base">Qty.</label>
            <Input
              type="number"
              inputMode="numeric"
              id="quantity"
              name="quantity"
              min="1"
              step="1"
              max={10}
              defaultValue={1}
              className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
            />
          </div>
        </div>
        <Button className="w-full mt-4" aria-label="cart-button">
          Add To Cart
          <ShoppingCart className="w-5 ml-2" />
        </Button>
      </form>
    </>
  );
}

export default ProductForm;
