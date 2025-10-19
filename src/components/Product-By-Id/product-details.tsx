import BackToProductButton from "@/components/Product-By-Id/back-to-product-button";
import ProductForm from "@/components/Product-By-Id/product-form";
import ProductInfo from "@/components/Product-By-Id/product-info";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ANProduct } from "@/db/schema";

export default async function ProductDetails({
  product,
}: {
  product: ANProduct;
}) {
  if (!product) {
    return (
      <div className="space-y-8 flex flex-col items-center justify-center">
        <Image
          src="/empty-state.svg"
          width="200"
          height="200"
          alt="Package"
          sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
        />
        <h2 className="text-2xl font-bold">You have no products yet</h2>
        <Button asChild>
          <Link href="/product/">View Products</Link>
        </Button>
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <BackToProductButton />
      <ProductInfo
        title={product.name}
        price={product.price}
        description={product.description}
        discount={product.discount}
      />
      <ProductForm productId={product.id} />
    </div>
  );
}
