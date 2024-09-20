"use client";

import { CldImage } from "next-cloudinary";

type DisplayImageProps = {
  public_id: string;
  alt: string;
};

export default function DisplayImage({ public_id, alt }: DisplayImageProps) {
  return (
    <figure className="h-72 border-b-2 border-palette-lighter relative">
      <CldImage
        src={public_id}
        alt={alt}
        fill
        className="transform duration-500 ease-in-out hover:scale-105 object-cover h-auto"
        sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
      />
    </figure>
  );
}
