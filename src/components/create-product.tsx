"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createProductAction } from "@/app/product/create/actions";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Card } from "./ui/card";
import { SelectScrollable } from "./scrollable-select";

export default function CreateProduct() {
  const [resource, setResource] = useState("");

  const handleSubmit = (formData: FormData) => {
    if (resource) {
      formData.append("public_id", resource);
      createProductAction(formData, resource);
    } else {
      console.error("Resource is undefined");
    }
  };
  return (
    <Card className="px-10 py-4 mt-4">
      <form action={handleSubmit} className="flex flex-col gap-4 mt-10">
        <div>
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
            {({ open }) => {
              return (
                <Button onClick={() => open()}>
                  {resource ? "Update Image" : "Upload an Image"}
                </Button>
              );
            }}
          </CldUploadWidget>
        </div>

        {resource && (
          <CldImage
            width="500"
            height="500"
            src={resource}
            alt="Description of my image"
          />
        )}
        <label htmlFor="name">Product name</label>
        <Input
          name="name"
          placeholder="Product name"
          required
          autoComplete="off"
        />
        <label htmlFor="price">Price</label>
        <Input name="price" placeholder="Price" required autoComplete="off" />
        <label htmlFor="discount">Discount</label>
        <Input name="discount" placeholder="Discount" autoComplete="off" />
        <label htmlFor="quantity">Quantity</label>
        <Input
          name="quantity"
          placeholder="Quantity"
          required
          autoComplete="off"
        />
        <label htmlFor="categories">Categories</label>
        <SelectScrollable name="categories" />
        <label htmlFor="description">Description</label>
        <Textarea name="description" placeholder="Description" required />

        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
}
