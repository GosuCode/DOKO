import { ANProduct } from "@/db/schema";
import ProductDetails from "./product-details";
import ProductImage from "./product-image";

function ProductSection({ product }: { product: ANProduct }) {
  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-4 lg:space-x-8 max-w-6xl w-11/12 mx-auto">
      <ProductImage image={product.image} name={product.name} />
      <ProductDetails product={product} />
    </div>
  );
}

export default ProductSection;
