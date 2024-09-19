import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import products from "@/data/products.json";

export function RecentSales() {
  return (
    <div className="space-y-8">
      {products.map((product) => (
        <div key={product.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={product.image} alt={product.name} />
            <AvatarFallback>{product.fallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{product.name}</p>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
          <div className="ml-auto font-medium">${product.price.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
