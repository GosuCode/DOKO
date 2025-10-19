"use client";

import { ProfileDropdown } from "@/components/profile-dropdown";
import SignIn from "@/components/sign-in";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, Menu, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import CartCount from "@/components/cart/cart-count";

const Header = () => {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize search query from URL params
  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/product/product-list?search=${encodeURIComponent(searchQuery.trim())}`
      );
    } else {
      router.push("/product/product-list");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
          : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group transition-transform duration-200 hover:scale-105"
          >
            <div className="relative">
              <Image
                src="/logo.svg"
                alt="Artisan Nepal"
                height={40}
                width={40}
                className="h-8 w-8 sm:h-10 sm:w-10 transition-all duration-200 group-hover:rotate-3"
                sizes="(max-width: 640px) 32px, 40px"
              />
            </div>
            <span className="font-bold text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Artisan Nepal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/"
              className="relative text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/product/product-list"
              className="relative text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium group"
            >
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/artisans"
              className="relative text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium group"
            >
              Artisans
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about-us"
              className="relative text-gray-700 hover:text-amber-600 transition-colors duration-200 font-medium group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-200 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search handmade products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-full transition-all duration-200"
              />
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon - Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-600 hover:text-amber-600 hover:bg-amber-50"
              onClick={() => router.push("/product/product-list")}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors duration-200"
            >
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <CartCount />

            {/* Profile/Auth */}
            <div className="flex items-center">
              {!session ? <SignIn /> : <ProfileDropdown />}
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-gray-600 hover:text-amber-600 hover:bg-amber-50"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-8">
                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-full"
                    />
                  </form>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4">
                    <Link
                      href="/"
                      className="text-lg font-medium text-gray-700 hover:text-amber-600 transition-colors duration-200 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Home
                    </Link>
                    <Link
                      href="/product/product-list"
                      className="text-lg font-medium text-gray-700 hover:text-amber-600 transition-colors duration-200 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Products
                    </Link>
                    <Link
                      href="/artisans"
                      className="text-lg font-medium text-gray-700 hover:text-amber-600 transition-colors duration-200 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Artisans
                    </Link>
                    <Link
                      href="/about-us"
                      className="text-lg font-medium text-gray-700 hover:text-amber-600 transition-colors duration-200 py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      About
                    </Link>
                  </nav>

                  {/* Mobile Actions */}
                  <div className="flex flex-col space-y-3 pt-6 border-t border-gray-200">
                    <Button
                      variant="ghost"
                      className="justify-start text-gray-700 hover:text-red-500 hover:bg-red-50"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                    {session && (
                      <Button
                        variant="ghost"
                        className="justify-start text-gray-700 hover:text-amber-600 hover:bg-amber-50"
                        asChild
                      >
                        <Link
                          href="/product/cart"
                          className="flex items-center"
                        >
                          <div className="relative mr-2">
                            <ShoppingCart className="h-4 w-4" />
                            <CartCount />
                          </div>
                          Cart
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
