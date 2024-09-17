"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { CldUploadWidget } from "next-cloudinary";
import { updateProductAction } from "@/app/product/your-product/actions";
import { ANProduct } from "@/db/schema";

type EditProductProps = {
  productId: number;
  product: ANProduct;
};
const EditProduct = ({ productId, product }: EditProductProps) => {
  const [resource, setResource] = useState(product.image);

  const handleSubmit = (formData: FormData) => {
    if (resource) {
      formData.append("public_id", resource);
      updateProductAction(productId, formData, resource);
    } else {
      console.error("Resource is undefined");
    }
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-bold text-center underline">
        Edit your product
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
        <label htmlFor="name">Proudct Name</label>
        <Input
          name="name"
          placeholder="Product name"
          required
          autoComplete="off"
          defaultValue={product.name}
        />
        <label htmlFor="description">Product Description</label>
        <Input
          name="description"
          placeholder="Description"
          required
          autoComplete="off"
          defaultValue={product.description}
        />
        <label htmlFor="price">Price</label>
        <Input
          name="price"
          placeholder="Price"
          required
          autoComplete="off"
          defaultValue={product.price}
        />
        <label htmlFor="discout">Discount</label>
        <Input
          name="discount"
          placeholder="Discount"
          autoComplete="off"
          defaultValue={product.discount}
        />
        <label htmlFor="quantity">Quantity</label>
        <Input
          name="quantity"
          placeholder="Quantity"
          required
          autoComplete="off"
          defaultValue={product.quantity}
        />

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default EditProduct;
