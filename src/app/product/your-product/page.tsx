import React from "react";
import { auth } from "@/auth";
import { database } from "@/db/database";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import EmptyState from "./empty-state";
import YourProductComponent from "@/components/your-product";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const YourProduct = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return <div>Unauthorized</div>;
  }
  const yourProducts = await database.query.products.findMany({
    where: eq(products.userId, session.user.id!),
  });

  const hasItems = yourProducts.length > 0;
  return (
    <div className="container">
      {hasItems ? (
        <Table>
          <TableCaption>List of your products</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          {yourProducts.map((product) => (
            <YourProductComponent key={product.id} product={product} />
          ))}
        </Table>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default YourProduct;
