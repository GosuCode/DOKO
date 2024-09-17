"use server"

import { auth } from "@/auth";
import { ANCart, ANProduct, cart } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { database } from "@/db/database";
import { revalidatePath } from "next/cache";

export async function showCartProducts() {
    const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized")
  }

  let cartProducts: (ANCart & { products: ANProduct })[];

    cartProducts = await database.query.cart.findMany({
      where: eq(cart.userId, session.user.id!),
      with: {
        products: {
          columns: {
            id: true,
            userId: true,
            name: true,
            image: true,
            price: true,
          },
        },
      },
    });

  return cartProducts;
}

export async function removeProductFromCart(productId: number) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized")
  }
  
  await database.delete(cart).where(and(eq(cart.userId, session.user.id!), eq(cart.productId, productId)))

  revalidatePath("/product/cart")
}