import { auth } from "@/auth";
import { ProfileDropdown } from "@/components/profile-dropdown";
import SignIn from "@/components/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = async () => {
  const session = await auth();
  // Add icons before list
  return (
    <header className="fixed top-0 left-0 w-full py-2 px-4 sm:px-0 flex bg-slate-100 justify-center z-50 h-16">
      <nav className="container flex justify-between items-center">
        <div className="container flex justify-between items-center gap-12">
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/logo.svg"
              alt="Logo"
              height={0}
              width={0}
              className="h-10 sm:h-12 w-auto"
              sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
            />
            <span className="font-bold md:text-xl hidden sm:inline-flex">
              Artisan Nepal
            </span>
          </Link>

          <div className="items-center md:space-x-2 lg:space-x-16 hidden lg:flex">
            <Link href="/" className="hover:underline flex items-center gap-1">
              Home
            </Link>
            <Link
              href="/product/product-list"
              className="hover:underline flex items-center gap-1"
            >
              All Products
            </Link>
            <Link
              href="/product/recommendation"
              className="hover:underline flex items-center gap-1"
            >
              Recommendations
            </Link>
          </div>
          <div className="items-center space-x-1 hidden sm:flex">
            <Input
              type="search"
              placeholder="Search"
              className="md:w-52 lg:w-96"
            />
            <Button type="submit">
              <Search size={18} />
            </Button>
          </div>

          <section className="flex items-center space-x-2">
            <div>{!session ? <SignIn /> : ""}</div>
            {session ? (
              <>
                <Button variant="ghost" className="hidden sm:flex" asChild>
                  <Link href={"/product/cart"}>
                    <ShoppingCart size={24} />
                  </Link>
                </Button>
                <ProfileDropdown />
              </>
            ) : (
              ""
            )}
          </section>
        </div>
      </nav>
    </header>
  );
};

export default Header;
