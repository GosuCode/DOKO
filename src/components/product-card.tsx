import Link from "next/link";
import DisplayImage from "./display-image";
import { ANProduct } from "@/db/schema";
import { getDiscountedPrice } from "@/utils/getDiscountedPrice";

function ProductCard({ product }: { product: ANProduct }) {
  const name = product.name;
  const description = product.description;
  const price = product.price;

  const image_public_id = product.image;

  return (
    <Link href={`/product/${product.id}`} passHref>
      <section className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter">
        <figure className="h-72 border-b-2 border-palette-lighter relative">
          <DisplayImage public_id={image_public_id} />
        </figure>
        <div className="h-48 relative">
          <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold text-purple-800 line-clamp-1">
            {name}
          </div>
          <div className="text-lg text-gray-600 px-4 py-1 font-primary font-light line-clamp-1">
            {description}
          </div>
          <span className="text-sm ml-3 px-1 py-1 text-green-700 rounded-full border-green-700 border-2">
            Free Shipping
          </span>
          <div className="ml-4 space-x-2">
            <span className="line-through">
              Rs.{getDiscountedPrice(price, 60)}
            </span>
            <span className="text-sm">(60% off)</span>
          </div>
          <div
            className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
            rounded-tl-sm triangle"
          >
            <span className="text-purple-800">Rs.{price}</span>
          </div>
        </div>
      </section>
    </Link>
  );
}

export default ProductCard;
