import { ANProduct } from "@/db/schema";
import ProductDetails from "./product-details";
import ProductImage from "./product-image";
import DisplayReview from "../review/display-review";
import { Card, CardContent } from "@/components/ui/card";

function ProductSection({ product }: { product: ANProduct }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <section className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="relative">
              <ProductImage image={product.image} name={product.name} />
            </div>
            <div className="space-y-8">
              <ProductDetails product={product} />
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-16">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
                  Product <span className="text-amber-600">Description</span>
                </h2>
                <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                  {product?.description}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <DisplayReview productId={product.id} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductSection;
