"use server"

import {database} from "@/db/database"
import { products } from "@/db/schema"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export async function createProductAction(formData: FormData){
    const session = await auth()

    if(!session){
        throw new Error("Unauthorized")
    }

    const user = session?.user;

    if(!user || !user.id){
        throw new Error("Unauthorized")
    }

    await database.insert(products).values({
        name: formData.get("name") as string,
        userId: user.id,
    })
    redirect("/")
}