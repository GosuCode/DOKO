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
        public_id: resource,
    }

    await database.insert(products).values({
        name: rawFormData.name as string,
        userId: rawFormData.userId,
        public_id: rawFormData.public_id as string,
    })
    redirect("/")
}