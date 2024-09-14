import React from "react";
import { auth } from "@/auth";
import { database } from "@/db/database";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import EmptyState from "./empty-state";
import YourProductComponent from "@/components/your-product";

const YourProduct = async () => {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  const yourProducts = await database.query.products.findMany({
    where: eq(products.userId, session.user.id!),
  });

  const hasItems = yourProducts.length > 0;
  return (
    <div className="container grid grid-cols-4 gap-4">
      {hasItems ? (
        yourProducts.map((product) => (
          <YourProductComponent key={product.id} product={product} />
        ))
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default YourProduct;
