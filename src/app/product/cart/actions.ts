"use server"

import { auth } from "@/auth";
import { ANCart, cart } from "@/db/schema";
import { eq } from "drizzle-orm";
import { database } from "@/db/database";

 export async function showCartProducts() {
    const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized")
  }

  let cartProducts: ANCart[] = [];

  try {
    cartProducts = await database.query.cart.findMany({
      where: eq(cart.userId, session.user.id!),
    });
  } catch (error) {
    console.error(error);
  }

  return cartProducts;
}