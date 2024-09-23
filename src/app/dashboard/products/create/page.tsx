"use client";

import CreateProduct from "@/components/create-product";
import { Breadcrumbs } from "@/components/dashboard/breadcrumbs";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Add Product", link: "/dashboard/products/create" },
];

const CreateProductPage = () => {
  return (
    <main className="mx-6 mt-4 h-screen overflow-auto">
      <Breadcrumbs items={breadcrumbItems} />
      <CreateProduct />
    </main>
  );
};

export default CreateProductPage;
