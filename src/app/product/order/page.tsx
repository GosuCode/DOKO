import Header from "@/app/header";
import CheckOutButton from "@/components/cart/checkout-button";
import OrderTable from "@/components/order/order-table";
import PageTitle from "@/components/page-title";
import BackToProductButton from "@/components/Product-By-Id/back-to-product-button";
import React from "react";
import { getOrder } from "./actions";

const OrderPage = async () => {
  const order = await getOrder();

  // const cartItemIds = order?.orderItems.map((item) => item.productId);

  if (!order) {
    return <div>No order found</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto mt-20 mb-20">
        <PageTitle text="Your Order" />
        <OrderTable order={order} />
        <div className="max-w-sm mx-auto space-y-4 px-2 flex flex-col space-x-2">
          {/* <CheckOutButton cartItemIds={cartItemIds} /> */}
          <BackToProductButton />
        </div>
      </div>
    </>
  );
};

export default OrderPage;
