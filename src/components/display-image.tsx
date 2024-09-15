"use client";

import { CldImage } from "next-cloudinary";

export default function DisplayImage({ public_id }: { public_id: string }) {
  return (
    <figure>
      <CldImage src={public_id} alt="Description of my image" fill />
    </figure>
  );
}
