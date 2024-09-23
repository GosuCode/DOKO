"use server"

import { auth } from "@/auth"
import { database } from "@/db/database"
import { cart, orderItems, orders, products, reviews } from "@/db/schema"
import { and, eq, sql } from "drizzle-orm"
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


export async function addReviewAction(productId: number, formData: FormData, rating: number) {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized")
  }

  const userId = session.user.id
  const content = formData.get("review") as string

  if (!content || content.trim().length === 0) {
    throw new Error("Review content is required")
  }
  if (isNaN(rating) || rating < 1 || rating > 5) {
    console.log("Invalid rating:", rating);
    throw new Error("Rating must be between 1 and 5")
  }

  const hasPurchased = await database.select()
    .from(orderItems)
    .innerJoin(orders, eq(orderItems.orderId, orders.id))
    .where(and(
      eq(orders.userId, userId),
      eq(orderItems.productId, productId)
    ))
    .execute()

  if (hasPurchased.length === 0) {
    throw new Error("You can only review products you have purchased")
  }

  try {
    await database.insert(reviews).values({
      productId: Number(productId),
      userId: userId,
      content,
      rating: Number(rating),
    }).execute()

    const avgRating = await database.select({ avg: sql`AVG(rating)` })
      .from(reviews)
      .where(eq(reviews.productId, productId))
      .execute()

    await database.update(products)
      .set({ avgRating: Math.round(avgRating[0].avg as number) })
      .where(eq(products.id, productId))
      .execute()

    return { success: true, message: "Review added successfully" }
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('23505')) { // Unique constraint violation
      throw new Error("You have already reviewed this product")
    }
    throw error
  }
}