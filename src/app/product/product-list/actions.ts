"use server"

import { database } from "@/db/database"
import { products } from "@/db/schema"

export async function getProducts(){
  const allProducts = await database.select().from(products);
  return allProducts;
}