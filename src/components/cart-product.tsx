import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ANCart, ANProduct, products } from "@/db/schema";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import DisplayImage from "./display-image";
import { database } from "@/db/database";
import { eq } from "drizzle-orm";

const CartProduct = async ({ cartProduct }: { cartProduct: ANCart }) => {
  const product: ANProduct[] = await database
    .select()
    .from(products)
    .where(eq(products.id, cartProduct.productId));

  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium relative w-[40px] h-[40px]">
            <DisplayImage public_id={product[0].image} />
          </TableCell>
          <TableCell className="line-clamp-2">{product[0].name}</TableCell>
          <TableCell className="line-clamp-2">
            {product[0].description}
          </TableCell>
          <TableCell>Rs.{product[0].price}</TableCell>
          <TableCell className="flex items-center">
            {/* <Button variant="outline">-</Button>
            <Input type="number" defaultValue={cartProduct.quantity} />
            <Button variant="outline">+</Button> */}
            {cartProduct.quantity}
          </TableCell>
          <TableCell>
            <Button variant="destructive">
              <Trash2 />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </>
  );
};

export default CartProduct;
