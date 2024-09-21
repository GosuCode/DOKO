import { ArrowRight } from "lucide-react";
import { ANOrders } from "@/db/schema";
import { Button } from "../ui/button";

function CheckOutButton({ order }: { order: ANOrders }) {
  return (
    <Button
      aria-label="checkout-products"
      className="bg-palette-primary text-white text-lg font-primary font-semibold pt-2 pb-1 leading-relaxed flex 
      justify-center items-center focus:ring-1 focus:ring-palette-light focus:outline-none w-full hover:bg-palette-dark rounded-sm"
    >
      Check Out
      <ArrowRight className="w-4 ml-2 inline-flex" />
    </Button>
  );
}

export default CheckOutButton;
