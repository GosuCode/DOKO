import { ANProduct } from "@/db/schema";
import ProductDetails from "./product-details";
import ProductImage from "./product-image";
import DisplayReview from "../review/display-review";

function ProductSection({ product }: { product: ANProduct }) {
  return (
    <section className="pt-12 my-12 sm:pt-20">
      <div className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
        <ProductImage image={product.image} name={product.name} />
        <ProductDetails product={product} />
      </div>
      <div className="container mt-10 p-10 sm:w-3/5 mx-auto bg-gray-100 rounded-md">
        {product?.description}
      </div>
      <DisplayReview productId={product.id} />
    </section>
  );
}

export default ProductSection;
