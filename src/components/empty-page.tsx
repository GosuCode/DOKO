import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  pageName: string;
  btnName: string;
  link: string;
  className?: string;
};
const EmptyComponent = ({ pageName, btnName, link, className }: Props) => {
  return (
    <div
      className={`space-y-8 flex flex-col items-center justify-center ${className}`}
    >
      <Image
        src="/empty-state.svg"
        width="200"
        height="200"
        alt="Package"
        sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
      />
      <h2 className="text-2xl font-bold">Your {pageName} is empty.</h2>
      <Button asChild>
        <Link href={link}>{btnName}</Link>
      </Button>
    </div>
  );
};

export default EmptyComponent;
