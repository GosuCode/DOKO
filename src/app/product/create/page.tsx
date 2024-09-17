"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createProductAction } from "./actions";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { CldUploadWidget } from "next-cloudinary";

const CreateProduct = () => {
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
    <main className="h-screen">
      <h1 className="text-2xl font-bold text-center underline">
        List your product
      </h1>

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
        <Input
          name="name"
          placeholder="Product name"
          required
          autoComplete="off"
        />
        <Input
          name="description"
          placeholder="Description"
          required
          autoComplete="off"
        />
        <Input name="price" placeholder="Price" required autoComplete="off" />
        <Input name="discount" placeholder="Discount" autoComplete="off" />
        <Input
          name="quantity"
          placeholder="Quantity"
          required
          autoComplete="off"
        />

        <Button type="submit">Submit</Button>
      </form>
    </main>
  );
};

export default CreateProduct;
