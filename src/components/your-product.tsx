"use client";

import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import { ANProduct } from "@/db/schema";
import DisplayImage from "./display-image";
import { Button } from "./ui/button";
import { Edit2Icon, Trash } from "lucide-react";
import Link from "next/link";
import { deleteProductAction } from "@/app/product/your-product/actions";

const YourProductComponent = ({ product }: { product: ANProduct }) => {
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium relative w-[40px] h-[40px]">
            <DisplayImage public_id={product.image} alt={product.name} />
          </TableCell>
          <TableCell>{product.name}</TableCell>
          <TableCell>{product.description}</TableCell>
          <TableCell>Rs.{product.price}</TableCell>
          <TableCell>{product.quantity}</TableCell>
          <TableCell className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href={`/product/your-product/${product.id}`}>
                <Edit2Icon size={16} />
              </Link>
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                deleteProductAction(product.id);
              }}
            >
              <Trash size={16} />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

export default YourProductComponent;
