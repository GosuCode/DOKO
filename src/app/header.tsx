import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = async () => {
  const session = await auth();

  return (
    <header className="py-2 flex justify-center">
      <nav className="container flex justify-between items-center">
        <div className="container flex justify-between items-center gap-12">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <Image src="/logo.svg" width="50" height="50" alt="Logo" />
            Artisan Nepal
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/product/product-list"
              className="hover:underline flex items-center gap-1"
            >
              All Products
            </Link>
            <Link
              href={"/product/create"}
              className="hover:underline flex items-center gap-1"
            >
              Add Product
            </Link>

            <Link
              href={"/product/your-product"}
              className="hover:underline flex items-center gap-1"
            >
              Your Product
            </Link>
          </div>

          <section className="flex items-center gap-6">
            <Button variant="ghost" asChild>
              <Link href={"/product/cart"}>
                <ShoppingCart />
              </Link>
            </Button>
            <div>{session?.user?.name}</div>
            <div>{session ? <SignOut /> : <SignIn />}</div>
          </section>
        </div>
      </nav>
    </header>
  );
};

export default Header;
