import CartTable from "@/components/cart/cart-table";
import CheckOutButton from "@/components/cart/checkout-button";
import PageTitle from "@/components/page-title";
import BackToProductButton from "@/components/Product-By-Id/back-to-product-button";
import { showCartProducts } from "./actions";
import EmptyCart from "./empty-cart";
import Header from "@/app/header";
import { createOrderAction } from "@/app/dashboard/products/orders/actions";
import { auth } from "@/auth";

async function CartPage() {
  const session = await auth();

  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User not found");
  }
  const cartProducts = await showCartProducts();
  const order = await createOrderAction(userId, cartProducts);

  const hasItems = cartProducts.length > 0;
  return (
    <>
      <Header />
      <div className="container mx-auto mt-20 mb-20">
        <PageTitle text="Your Cart" />
        {hasItems ? (
          <>
            <CartTable cart={cartProducts} />
            <div className="max-w-sm mx-auto space-y-4 px-2 flex flex-col space-x-2">
              <CheckOutButton order={order} />
              <BackToProductButton />
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </div>
    </>
  );
}

export default CartPage;
