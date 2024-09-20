"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import carouselData from "@/data/carousel-data.json";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
// import Image from "next/image";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-full h-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {carouselData.map((item) => (
          <CarouselItem key={item.id}>
            <>
              <Card>
                <CardContent
                  className="flex aspect-auto h-[500px] items-center justify-center"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  {/* <Image
                    src={item.image}
                    alt={item.title}
                    width={0}
                    height={0}
                    className="object-cover w-auto h-full"
                    sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
                  /> */}
                </CardContent>
              </Card>
            </>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
