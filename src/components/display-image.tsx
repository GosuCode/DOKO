"use client";

import { CldImage } from "next-cloudinary";

export default function DisplayImage({ public_id }: { public_id: string }) {
  return (
    <CldImage
      src={public_id}
      alt="Description of my image"
      fill
      className="object-cover rounded-t-sm"
      sizes="160px"
    />
  );
}
