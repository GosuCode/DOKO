"use server";

import { database } from "@/db/database";
import { ANCartWithProduct, orders } from "@/db/schema";

export async function createOrderAction(userId: string , items: ANCartWithProduct[]) {
  await database.insert(orders).values({
    userId,
    totalAmount: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  // const order: ANOrders | undefined = await database.query.orders.findFirst({
  //   where: eq(orders.id, order.id)
  // })

  // await database.insert(orderItems).values({
  //   orderId: order.id,
  //   productId: items.productId,
  //   quantity: items.quantity
  // })
}

// export async function getOrder(id: number) {
//   const order = await database
//     .select()
//     .from(orders)
//     .where(eq(orders.id, id));
//   return order;
// }