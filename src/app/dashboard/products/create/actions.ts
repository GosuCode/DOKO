"use server"

import {database} from "@/db/database"
import { products } from "@/db/schema"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export async function createProductAction(formData: FormData, resource: string){
    const session = await auth()
    
    if(!session){
        throw new Error("Unauthorized")
    }

    const user = session?.user;

    if(!user || !user.id){
        throw new Error("Unauthorized")
    }
    const rawFormData = {
        userId: user.id,
        name: formData.get("name"),
        image: resource,
        description: formData.get("description"),
        price: formData.get("price"),
        quantity: formData.get("quantity"),
        avgRating: formData.get("avgRating"),
        availability: formData.get("availability"),
        discount: formData.get("discount"),
        categories: formData.get("categories"),
    }

    await database.insert(products).values({
        name: rawFormData.name as string,
        userId: rawFormData.userId,
        image: rawFormData.image as string,
        description: rawFormData.description as string,
        price: rawFormData.price as unknown as number,
        quantity: rawFormData.quantity as unknown as number,
        avgRating: rawFormData.avgRating as unknown as number,
        availability: rawFormData.availability as string,
        discount: rawFormData.discount as unknown as number,
        categories: rawFormData.categories as string,
    })
    redirect("/dashboard/products/your-product")
}