"use client";

import { CldImage } from "next-cloudinary";

type DisplayImageProps = {
  public_id: string;
  alt: string;
  className?: string;
};

export default function DisplayImage({
  public_id,
  alt,
  className,
}: DisplayImageProps) {
  return (
    <figure
      className={`border-b-2 border-palette-lighter relative ${className}`}
    >
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
