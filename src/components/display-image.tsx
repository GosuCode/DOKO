"use client";

import { CldImage } from "next-cloudinary";

export default function DisplayImage({ public_id }: { public_id: string }) {
  return (
    <CldImage
      width="500"
      height="500"
      src={public_id}
      alt="Description of my image"
    />
  );
}
