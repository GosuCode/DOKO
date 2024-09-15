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
    <Card className="flex flex-col items-center">
      <CardHeader>
        <CardTitle className="container relative w-[160px] h-[128px]">
          <Link href={`/product/${product.id}`}>
            <DisplayImage public_id={product.image} alt={product.name} />
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </CardContent>
      <CardFooter className="flex justify-between items-start">
        <p>Rs.{product.price}</p>
      </CardFooter>
    </Card>
  );
};

export default SingleProductCard;
