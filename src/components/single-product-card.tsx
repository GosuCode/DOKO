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

const SingleProductCard = ({ product }: { product: ANProduct }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.userId}</CardDescription>
      </CardHeader>
      <CardContent className="relative w-full h-[160px]">
        <DisplayImage public_id={product.image} />
      </CardContent>
      <CardFooter>
        <p>{product.price}</p>
        <p>{product.quantity}</p>
      </CardFooter>
    </Card>
  );
};

export default SingleProductCard;
