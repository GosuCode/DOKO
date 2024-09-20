"use server"

import { auth } from "@/auth"
import { database } from "@/db/database"
import { cart, products } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

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

  const subtotal = product.price * quantity - (product.price * product.discount / 100);

  await database.insert(cart).values({
    userId: session.user.id,
    productId,
    quantity,
    subtotal: subtotal,
  })

  await database.update(products).set({
    quantity: product.quantity - quantity,
  }).where(eq(products.id, productId))
  
  revalidatePath(`/product/${productId}`)
}