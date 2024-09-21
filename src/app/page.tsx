import Banner from "@/components/banner";
import Header from "./header";
import Footer from "./footer";
import AllProducts from "@/components/all-products/all-products";
import { ANProduct } from "@/db/schema";
import { getProducts } from "./product/product-list/actions";

export default async function Home() {
  const allProducts: ANProduct[] = await getProducts();
  return (
    <main className="mt-16 container mx-auto py-12">
      <Header />
      <Banner />
      <h1 className="text-center text-2xl sm:text-4xl font-bold mt-14 underline">
        Explore the Products
      </h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 grid-cols-1 sm:space-x-2 space-y-4 mt-12">
        <AllProducts allProducts={allProducts} />
      </div>
      <Footer />
    </main>
  );
}
