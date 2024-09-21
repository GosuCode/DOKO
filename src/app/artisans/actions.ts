"use server"

import { database } from "@/db/database";
import { users, products } from "@/db/schema";
import { eq, count } from "drizzle-orm";

export async function getArtisans() {
    const artisans = await database.select().from(products)
  return artisans;
}

export async function hasUserListedProducts() {
  const productCount = await database
    .select({ count: count() })
    .from(products)
    .where(eq(products.userId, users.id));

  return productCount[0].count > 0;
}