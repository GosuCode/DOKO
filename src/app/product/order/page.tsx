import Header from "@/app/header";
import OrderTable from "@/components/order/order-table";
import PageTitle from "@/components/page-title";
import BackToProductButton from "@/components/Product-By-Id/back-to-product-button";
import React from "react";
import { getOrder } from "./actions";
import EmptyComponent from "@/components/empty-page";

const OrderPage = async () => {
  const order = await getOrder();

  console.log(order);
  if (!order) {
    return (
      <>
        <EmptyComponent
          pageName="order"
          btnName="Add to Cart"
          link="/product/product-list"
        />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto mt-20 mb-20">
        <PageTitle text="Your Order" />
        <OrderTable order={order} />
        <div className="max-w-sm mx-auto space-y-4 px-2 flex flex-col space-x-2">
          <BackToProductButton />
        </div>
      </div>
    </>
  );
};

export default OrderPage;
