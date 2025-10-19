import { Badge } from "@/components/ui/badge";

interface ProductInfoProps {
  title: string;
  description: string;
  price: number;
  discount: number;
}

function ProductInfo({ title, price, discount }: ProductInfoProps) {
  const discountedPrice = price - (price * discount) / 100;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-4">
          {title}
        </h1>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"></div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Rs. {discountedPrice.toFixed(0).toLocaleString()}
          </span>
          {discount > 0 && (
            <div className="flex flex-col">
              <span className="text-lg text-gray-500 line-through">
                Rs. {price.toLocaleString()}
              </span>
              <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full">
                {discount}% OFF
              </Badge>
            </div>
          )}
        </div>

        {discount > 0 && (
          <div className="text-sm text-gray-600">
            You save Rs. {(price - discountedPrice).toFixed(0).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductInfo;
