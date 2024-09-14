import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DisplayImage from "./display-image";
import { ANProduct } from "@/db/schema";
import Link from "next/link";

const SingleProductCard = ({ product }: { product: ANProduct }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/product/${product.id}`}>{product.name}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative w-full h-[160px]">
        <Link href={`/product/${product.id}`}>
          <DisplayImage public_id={product.image} />
        </Link>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p>{product.price > 0 ? "Available" : "Sold"}</p>
        <p>Rs.{product.quantity}</p>
      </CardFooter>
    </Card>
  );
};

export default SingleProductCard;
