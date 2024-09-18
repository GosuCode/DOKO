import Banner from "@/components/banner";
import ProductList from "./product/product-list/page";

export default async function Home() {
  return (
    <main className="mt-16">
      <Banner />
      <h1 className="text-center text-4xl font-bold mt-8 underline">
        Explore the Products
      </h1>
      <ProductList />
    </main>
  );
}
