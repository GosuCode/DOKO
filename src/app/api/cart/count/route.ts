import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { database } from "@/db/database";
import { cart } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ count: 0 });
        }

        const cartItems = await database
            .select()
            .from(cart)
            .where(eq(cart.userId, session.user.id));

        const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        return NextResponse.json({ count: totalQuantity });
    } catch (error) {
        console.error("Error fetching cart count:", error);
        return NextResponse.json({ count: 0 });
    }
}
