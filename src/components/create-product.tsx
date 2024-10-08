"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { SelectScrollable } from "./scrollable-select";
import { createProductAction } from "@/app/dashboard/products/create/actions";
import toast from "react-hot-toast";

export default function CreateProduct() {
  const [resource, setResource] = useState("");

  const handleSubmit = (formData: FormData) => {
    if (resource) {
      formData.append("public_id", resource);
      createProductAction(formData, resource);
    } else {
      toast.error("Image is required.");
    }
  };

  return (
    <section className="px-10 py-8 mt-4 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Create New Product</h1>
      <form action={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-start">
          <CldUploadWidget
            uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
            onSuccess={(result) => {
              if (
                typeof result.info === "object" &&
                "secure_url" in result.info
              ) {
                setResource(result.info.public_id);
              }
            }}
            options={{
              singleUploadAutoClose: true,
            }}
          >
            {({ open }) => (
              <Button type="button" onClick={() => open()} className="mb-4">
                {resource ? "Update Image" : "Upload an Image"}
              </Button>
            )}
          </CldUploadWidget>

          {resource && (
            <div className="w-full mt-4">
              <CldImage
                src={resource}
                width={500}
                height={500}
                alt="Product Image"
                className="w-64 h-64 object-cover rounded-md"
                sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Product Name
            </label>
            <Input
              name="name"
              placeholder="Product name"
              required
              autoComplete="off"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="price" className="block mb-1 font-medium">
              Price
            </label>
            <Input
              type="number"
              name="price"
              placeholder="Price"
              required
              step={1}
              autoComplete="off"
              className="w-full"
            />
          </div>

          <div className="hidden">
            <label htmlFor="discount" className="block mb-1 font-medium">
              Discount
            </label>
            <Input
              type="number"
              step={1}
              name="discount"
              placeholder="Discount"
              defaultValue={0}
              autoComplete="off"
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block mb-1 font-medium">
              Quantity
            </label>
            <Input
              type="number"
              step={1}
              name="quantity"
              placeholder="Quantity"
              required
              autoComplete="off"
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label htmlFor="categories" className="block mb-1 font-medium">
            Categories
          </label>
          <SelectScrollable name="categories" />
        </div>

        <div>
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <Textarea
            name="description"
            placeholder="Description"
            required
            className="w-full"
          />
        </div>

        <div className="flex justify-start">
          <Button type="submit" className="px-6 py-2">
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
}
