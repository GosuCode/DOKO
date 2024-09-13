import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DisplayImage from "./display-image";
import { ANProduct } from "@/db/schema";
import { Button } from "./ui/button";
import Link from "next/link";

const SingleProductCard = ({ product }: { product: ANProduct }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="relative w-full h-[160px]">
        <DisplayImage public_id={product.image} />
      </CardContent>
      <CardFooter>
        <CardDescription>{product.description}</CardDescription>
      </CardFooter>
      <p>{product.price > 0 ? "Available" : "Sold"}</p>
      <p>Rs.{product.quantity}</p>
      <Button asChild>
        <Link href={`/product/${product.id}`}>Add to cart</Link>
      </Button>
    </Card>
  );
};

export default SingleProductCard;
