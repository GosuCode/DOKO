"use server"

import { auth } from "@/auth";
import { database } from "@/db/database";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getOrder() {
    const session = await auth();

    if (!session || !session.user) {
        throw new Error("Unauthorized")
    }

    const order = await database.query.orders.findFirst({
        where: eq(orders.userId, session.user.id!),
        with: {
            orderItems: {
                with: {
                    product: true
                }
            }
        }
    })

    return order
}