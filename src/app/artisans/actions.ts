"use server"

import { database } from "@/db/database";
import { users, products } from "@/db/schema";
import { eq, count, desc, sql } from "drizzle-orm";

export async function getArtisans() {
  const artisans = await database
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      image: users.image,
      productCount: count(products.id),
      totalSales: sql<number>`COALESCE(SUM(${products.price}), 0)`,
      avgRating: sql<number>`COALESCE(AVG(${products.avgRating}), 0)`,
      joinedAt: sql<Date>`MIN(${products.createdAt})`,
    })
    .from(users)
    .leftJoin(products, eq(users.id, products.userId))
    .groupBy(users.id, users.name, users.email, users.image)
    .having(sql`COUNT(${products.id}) > 0`)
    .orderBy(desc(count(products.id)));

  return artisans;
}

export async function getArtisanById(artisanId: string) {
  const artisan = await database
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      image: users.image,
      productCount: count(products.id),
      totalSales: sql<number>`COALESCE(SUM(${products.price}), 0)`,
      avgRating: sql<number>`COALESCE(AVG(${products.avgRating}), 0)`,
      joinedAt: sql<Date>`MIN(${products.createdAt})`,
    })
    .from(users)
    .leftJoin(products, eq(users.id, products.userId))
    .where(eq(users.id, artisanId))
    .groupBy(users.id, users.name, users.email, users.image);

  return artisan[0] || null;
}

export async function getArtisanProducts(artisanId: string) {
  const artisanProducts = await database
    .select()
    .from(products)
    .where(eq(products.userId, artisanId))
    .orderBy(desc(products.createdAt));

  return artisanProducts;
}

export async function hasUserListedProducts() {
  const productCount = await database
    .select({ count: count() })
    .from(products)
    .where(eq(products.userId, users.id));

  return productCount[0].count > 0;
}