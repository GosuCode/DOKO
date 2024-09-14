"use server"

import { auth } from "@/auth"
import { database } from "@/db/database"
import { cart, products } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function createCartAction(productId: number, formData: FormData) {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized")
  }

  const product = await database.query.products.findFirst({
    where: eq(products.id, productId),
  })

  if (!product) {
    throw new Error("Product not found")
  }

  const quantity = Number(formData.get("quantity"))
  if (isNaN(quantity) || quantity <= 0) {
    throw new Error("Invalid quantity")
  }

  const cartItem = await database.insert(cart).values({
    userId: session.user.id,
    productId,
    quantity,
  })

  if (!cartItem || cartItem.length === 0) {
    throw new Error("Failed to add item to cart")
  }

  await database.update(products).set({
    quantity: product.quantity - quantity,
  }).where(eq(products.id, productId))
  

}