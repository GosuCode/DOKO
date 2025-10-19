import CartTable from "@/components/cart/cart-table";
import CheckOutButton from "@/components/cart/checkout-button";
import { showCartProducts } from "./actions";
import Header from "@/app/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Heart, Share2 } from "lucide-react";
import Link from "next/link";

async function CartPage() {
  const cartProducts = await showCartProducts();
  const cartItemIds = cartProducts.map((product) => product.id);
  const hasItems = cartProducts.length > 0;

  const subtotal = cartProducts.reduce(
    (total, item) => total + item.subtotal * item.quantity,
    0
  );
  const shipping = subtotal > 5000 ? 0 : 200;
  const tax = subtotal * 0.13;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <Header />

      <div className="pt-20 lg:pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/product/product-list">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  Your Shopping Cart
                </span>
              </h1>
            </div>
            <p className="text-gray-600">
              {hasItems
                ? `${cartProducts.length} item${
                    cartProducts.length !== 1 ? "s" : ""
                  } in your cart`
                : "Your cart is empty"}
            </p>
          </div>

          {hasItems ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5 text-amber-600" />
                      Cart Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <CartTable cart={cartProducts} />
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>Rs. {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping</span>
                        <span
                          className={shipping === 0 ? "text-green-600" : ""}
                        >
                          {shipping === 0 ? "FREE" : `Rs. ${shipping}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax (13%)</span>
                        <span>Rs. {tax.toFixed(0)}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            Rs. {total.toFixed(0).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Free Shipping Progress */}
                    {subtotal < 5000 && (
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="secondary"
                            className="bg-amber-100 text-amber-800"
                          >
                            Free Shipping
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Add Rs. {(5000 - subtotal).toLocaleString()} more for
                          free shipping!
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.min(
                                (subtotal / 5000) * 100,
                                100
                              )}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <CheckOutButton cartItemIds={cartItemIds} />

                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1" asChild>
                          <Link href="/product/product-list">
                            Continue Shopping
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon">
                          <Heart className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Security Badges */}
                    <div className="pt-4 border-t">
                      <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Secure Checkout</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>SSL Encrypted</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            /* Empty Cart */
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="h-16 w-16 text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven&apos;t added any items to your cart yet.
                Start shopping to fill it up!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-amber-600 to-orange-600"
                >
                  <Link href="/product/product-list">Start Shopping</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
