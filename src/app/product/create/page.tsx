"use client";

import CreateProduct from "@/components/create-product";

const CreateProductPage = () => {
  return (
    <main className="h-screen">
      <h1 className="text-2xl font-bold text-center underline">
        List your product
      </h1>

      <CreateProduct />
    </main>
  );
};

export default CreateProductPage;
