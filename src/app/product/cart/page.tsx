import { auth } from "@/auth";
import { ANCart, cart } from "@/db/schema";
import { eq } from "drizzle-orm";
import { database } from "@/db/database";
import CartProduct from "@/components/cart-product";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

const Cart = async () => {
  const session = await auth();

  if (!session || !session.user) {
    return <div>Unauthorized</div>;
  }

  let cartProducts: ANCart[] = [];

  try {
    cartProducts = await database.query.cart.findMany({
      where: eq(cart.userId, session.user.id!),
    });
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="grid grid-cols-12 space-x-4">
      <section className="col-span-8">
        <Table>
          <TableCaption>Your cart items</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          {cartProducts.map((product) => (
            <CartProduct key={product.id} cartProduct={product} />
          ))}
        </Table>
      </section>
      <section className="col-start-9 col-span-4">
        <Card>
          <CardTitle>Order Summary</CardTitle>
          <CardContent className="flex justify-between">
            <h2>Subtotal(0 items)</h2>
            <h2>Rs. 9898</h2>
          </CardContent>
        </Card>
        <Button>Proceed to Checkout</Button>
      </section>
    </section>
  );
};

export default Cart;
