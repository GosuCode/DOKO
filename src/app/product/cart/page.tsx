import CartTable from "@/components/cart/cart-table";
import CheckOutButton from "@/components/cart/checkout-button";
import PageTitle from "@/components/page-title";
import BackToProductButton from "@/components/Product-By-Id/back-to-product-button";
import { showCartProducts } from "./actions";
import Header from "@/app/header";
import EmptyComponent from "@/components/empty-page";
import { getOrder } from "../order/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function CartPage() {
  const cartProducts = await showCartProducts();
  const cartItemIds = cartProducts.map((product) => product.id);
  const order = await getOrder();
  const checkOrder = order?.orderItems.length;

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
              <CheckOutButton cartItemIds={cartItemIds} />
              <BackToProductButton />
            </div>
          </>
        ) : (
          <EmptyComponent
            pageName="cart"
            btnName="Add Product"
            link="/product/product-list"
          />
        )}
        <div className="flex justify-center mt-10">
          {checkOrder! > 0 ? (
            <Button>
              <Link href="/product/order">View Order</Link>
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export default CartPage;
