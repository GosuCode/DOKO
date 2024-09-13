"use client";

import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./ui/button";

export default function UploadImage() {
  const [resource, setResource] = useState("");

  return (
    <>
      <CldUploadWidget
        uploadPreset="asefjpje"
        onSuccess={(result) => {
          if (typeof result.info === "object" && "secure_url" in result.info) {
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

      {resource && (
        <CldImage
          width="500"
          height="500"
          src={resource}
          alt="Description of my image"
        />
      )}
    </>
  );
}
