import Banner from "@/components/banner";
import Header from "./header";
import Footer from "./footer";
import AllProducts from "@/components/all-products/all-products";
import { ANProduct } from "@/db/schema";
import { getProducts } from "./product/product-list/actions";
import RecommendationPage from "./product/recommendation/page";

export default async function Home() {
  const allProducts: ANProduct[] = await getProducts();
  return (
    <main className="pt-20 lg:pt-24">
      <Header />
      <div className="container mx-auto py-12">
        <Banner />
        {/* <h2>Shop by Category</h2>
      <p>
        Find the perfect product for your needs from our curated collections
      </p> */}
        <RecommendationPage />
        <div className="text-center">
          <h2 className="ml-10 sm:ml-4 text-2xl sm:text-4xl font-bold mt-14">
            Featured Products
          </h2>
          <p className="text-slate-500">
            Check out our latest and most popular items
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12 px-4">
          <AllProducts allProducts={allProducts} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
