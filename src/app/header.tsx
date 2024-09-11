import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import Image from "next/image";
import Link from "next/link";

const Header = async () => {
  const session = await auth();

  return (
    <header className="bg-slate-200 py-2 flex justify-center">
      <nav className="container flex justify-between items-center">
        <div className="container flex justify-between items-center gap-12">
          <Link href="/" className="hover:underline flex items-center gap-1">
            <Image src="/logo.png" width="50" height="50" alt="Logo" />
            Artisan Nepal
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/" className="hover:underline flex items-center gap-1">
              All Products
            </Link>
          </div>
          <section className="flex items-center gap-6">
            <div>{session?.user?.name}</div>
            <div>{session ? <SignOut /> : <SignIn />}</div>
          </section>
        </div>
      </nav>
    </header>
  );
};

export default Header;
