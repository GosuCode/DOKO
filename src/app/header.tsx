import { auth } from "@/auth";
import ProfileDropdown from "@/app/profile-dropdown";
import SignIn from "@/components/sign-in";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Header = async () => {
  const session = await auth();
  const profileImage = session?.user?.image;
  const userName = session?.user?.name;

  return (
    <header className="fixed top-0 left-0 w-full py-2 flex bg-white justify-center z-50 h-16">
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
            <div>{!session ? <SignIn /> : ""}</div>
            {session ? (
              <>
                <Button
                  variant="ghost"
                  className="fixed top-2 right-24"
                  asChild
                >
                  <Link href={"/product/cart"}>
                    <ShoppingCart size={28} />
                  </Link>
                </Button>
                <ProfileDropdown
                  profileImage={profileImage}
                  userName={userName}
                  session={session}
                />
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
