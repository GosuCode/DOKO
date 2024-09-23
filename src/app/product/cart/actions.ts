"use server"

import { auth } from "@/auth";
import { ANCartWithProduct, cart, orderItems, orders } from "@/db/schema";
import { and, eq, inArray } from "drizzle-orm";
import { database } from "@/db/database";
import { revalidatePath } from "next/cache";

export async function showCartProducts() {
    const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized")
  }

  const cartProducts: ANCartWithProduct[] = await database.query.cart.findMany({
      where: eq(cart.userId, session.user.id!),
      with: {
        products: true
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

export async function checkout(cartItemIds: number[]) {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  
  let cartItems;
  if (cartItemIds) {
    cartItems = await database.query.cart.findMany({
      where: and(
        eq(cart.userId, session.user.id!),
        inArray(cart.id, cartItemIds)
      ),
      with: { products: true },
    });
  } else {
    // Fetch all cart items
    cartItems = await database.query.cart.findMany({
      where: eq(cart.userId, session.user.id!),
      with: {
        products: true
      },
    });
  }

  if (cartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  // Create a new order
  const [newOrder] = await database.insert(orders).values({
    userId: session.user.id!,
    status: 'completed',
    createdAt: new Date(),
    totalAmount: 0,
  }).returning();

  // Add items to the order
  await database.insert(orderItems).values(
    cartItems.map(item => ({
      orderId: newOrder.id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.products.price,
    }))
  );

  // Clear the user's cart
  await database.delete(cart).where(eq(cart.userId, session.user.id!));

  revalidatePath("/product/cart");

  return { success: true, orderId: newOrder.id };
}