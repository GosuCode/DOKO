"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { SelectScrollable } from "../scrollable-select";
import { Button } from "../ui/button";

type SidebarProps = {
  setSelectedCategory: (category: string | null) => void;
  setSelectedPrice: (price: string | null) => void;
  applyFilters: () => void;
  clearFilters: () => void;
};

export default function ProductSidebar({
  setSelectedCategory,
  setSelectedPrice,
  applyFilters,
  clearFilters,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        `relative hidden h-screen flex-none border-r bg-card transition-[width] duration-500 md:block`,
        "w-80"
      )}
    >
      <div className="hidden p-5 pt-10 lg:block">
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            height="50"
            width="50"
            alt="Logo"
            sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
          />
        </Link>
      </div>
      {/* Filters */}
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="mt-3 space-y-1">
            <section className="grid items-start gap-2">
              <h2 className="text-lg font-semibold">Filters</h2>

              <div>
                <label htmlFor="category">Category</label>
                <SelectScrollable
                  name="category"
                  onChange={(value) => setSelectedCategory(value)}
                />
              </div>

              <div>
                <label htmlFor="price">Price</label>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="price"
                      id="price-low"
                      value="low"
                      onChange={(e) => setSelectedPrice(e.target.value)}
                    />
                    <label htmlFor="price-low">Low</label>
                    <input
                      type="radio"
                      name="price"
                      id="price-high"
                      value="high"
                      onChange={(e) => setSelectedPrice(e.target.value)}
                    />
                    <label htmlFor="price-high">High</label>
                  </li>
                </ul>
              </div>

              <Button variant="default" onClick={applyFilters}>
                Apply Filters
              </Button>
              <Button variant="default" onClick={clearFilters}>
                Clear Filters
              </Button>
            </section>
          </div>
        </div>
      </div>
    </aside>
  );
}
