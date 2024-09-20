"use server"
import { auth } from "@/auth"
import { database } from "@/db/database"
import { products } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function deleteProductAction(productId: number) {
  const session = await auth()
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized")
  }

  await database.delete(products).where(eq(products.id, productId))
  revalidatePath("/product/your-product")
}

export async function updateProductAction(productId: number, formData: FormData, resource: string) {
    const session = await auth()
    if (!session || !session.user || !session.user.id) {
        throw new Error("Unauthorized")
    }

    const image = resource
    const name = formData.get("name")?.toString()
    const description = formData.get("description")?.toString()
    const price = Number(formData.get("price"))
    const discount = Number(formData.get("discount"))
    const quantity = Number(formData.get("quantity"))
    if (isNaN(price) || price <= 0) {
        throw new Error("Invalid price")
    }
    if (isNaN(quantity) || quantity <= 0) {
        throw new Error("Invalid quantity")
    }

    await database.update(products).set({
        image,
        name,
        description,
        price,
        discount,
        quantity
    }).where(eq(products.id, productId))

    revalidatePath(`/product/your-product/${productId}`)
}

export async function getSingleProductAction(productId: number) {
    const session = await auth();
    
    if (!session || !session.user || !session.user.id) {
      throw new Error("Unauthorized");
    }
  
    if (!productId) {
      throw new Error("Product ID is undefined");
    }
  
    const product = await database
      .select()
      .from(products)
      .where(eq(products.id, productId));
  
    return product;
}