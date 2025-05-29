import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Check, ImageIcon, Plus } from "lucide-react";

import type { ANProduct } from "@/db/schema";
import { cn } from "@/lib/utils";
import DisplayImage from "./display-image";

type ProductCardProps = {
  product: ANProduct;
  isAddedToCart?: boolean;
  onSwitch?: () => Promise<void>;
};

export default function ProductCard({
  product,
  isAddedToCart = false,
  onSwitch,
}: ProductCardProps) {
  const subtotal = product.price - (product.price * product.discount) / 100;
  const image_public_id = product.image;

  return (
    <Card className={cn("h-full overflow-hidden w-80")}>
      <Link
        aria-label={`View ${product.name} details`}
        href={`/product/${product.id}`}
      >
        <CardHeader className="border-b p-0">
          <AspectRatio ratio={4 / 3}>
            {product.image ? (
              <DisplayImage
                public_id={image_public_id}
                alt={product.name}
                className="h-72"
              />
            ) : (
              <div
                className="flex size-full items-center justify-center bg-secondary"
                role="img"
                aria-label="Placeholder"
              >
                <ImageIcon className="size-9 text-muted-foreground" />
              </div>
            )}
          </AspectRatio>
        </CardHeader>
      </Link>

      <Link href={`/product/${product.id}`}>
        <CardContent className="grid gap-2.5 p-4">
          <CardTitle className="line-clamp-1">{product.name}</CardTitle>
          <CardDescription className="flex items-center gap-1 text-sm text-muted-foreground">
            {product.discount > 0 && (
              <>
                <span className="line-through text-sm">
                  Rs. {product.price}
                </span>
                <span>({product.discount}% off)</span>
              </>
            )}
          </CardDescription>
          <p className="text-base font-medium text-purple-800">
            Rs. {subtotal}
          </p>
        </CardContent>
      </Link>

      <CardFooter className="p-4">
        <Button
          size="default"
          variant="secondary"
          className="h-8 w-full whitespace-nowrap"
          disabled={!onSwitch}
          onClick={() => onSwitch?.()}
        >
          {isAddedToCart ? (
            <>
              <Check className="mr-2 size-4" /> Added
            </>
          ) : (
            <>
              <Plus className="mr-2 size-4" /> Add to cart
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
