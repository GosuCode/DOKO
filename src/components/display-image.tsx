"use client";

import { CldImage } from "next-cloudinary";

type DisplayImageProps = {
  public_id: string;
  alt: string;
};

export default function DisplayImage({ public_id, alt }: DisplayImageProps) {
  return (
    <figure>
      <CldImage
        src={public_id}
        alt={alt}
        fill
        className="transform duration-500 ease-in-out hover:scale-105"
      />
    </figure>
  );
}
