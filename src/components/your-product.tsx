"use client";

import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

import { ANProduct } from "@/db/schema";
import DisplayImage from "./display-image";
import { Button } from "./ui/button";
import { Edit2Icon, Trash } from "lucide-react";
import Link from "next/link";
import { deleteProductAction } from "@/app/dashboard/your-product/actions";

const YourProductComponent = ({ product }: { product: ANProduct }) => {
  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>
            <div className="relative w-[120px] h-[120px]">
              <DisplayImage public_id={product.image} alt={product.name} />
            </div>
          </TableCell>
          <TableCell>{product.name}</TableCell>
          <TableCell>{product.description}</TableCell>
          <TableCell>Rs.{product.price}</TableCell>
          <TableCell>{product.quantity}</TableCell>
          <TableCell>
            <div className="flex space-x-2 items-center">
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
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

export default YourProductComponent;
