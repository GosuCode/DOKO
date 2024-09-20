import Link from "next/link";
import DisplayImage from "./display-image";
import { ANProduct } from "@/db/schema";

function ProductCard({ product }: { product: ANProduct }) {
  const name = product.name;
  const price = product.price;
  const discount = product.discount;
  const image_public_id = product.image;
  const subtotal = product.price - (product.price * product.discount) / 100;

  return (
    <Link href={`/product/${product.id}`} className="flex justify-center">
      <section className="h-[400px] w-80 rounded shadow-lg border border-palette-lighter">
        <>
          <DisplayImage
            public_id={image_public_id}
            alt={product.name}
            className="h-72"
          />
        </>
        <div className="relative">
          <div className="font-primary text-palette-primary text-2xl pt-4 px-4 font-semibold line-clamp-1">
            {name}
          </div>
          <div className="ml-4 space-x-1">
            <span className="line-through">
              {discount === 0 ? "" : `Rs.${price}`}
            </span>
            <span className="text-sm">
              {discount === 0 ? "" : `(${discount}% off)`}
            </span>
          </div>
          <div
            className="text-palette-dark font-primary font-medium text-base absolute -bottom-12 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
            rounded-tl-sm triangle"
          >
            <span className="text-purple-800">Rs.{subtotal}</span>
          </div>
        </div>
      </section>
    </Link>
  );
}

export default ProductCard;
