import { auth } from "@/auth";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { database } from "@/db/database";

const Cart = async () => {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }
  const cartItems = await database.query.products.findMany({
    where: eq(products.userId, session.user.id!),
  });

  return (
    <div>
      <h1>Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default Cart;
