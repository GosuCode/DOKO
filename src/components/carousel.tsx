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
export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full h-[400px] sm:h-[500px] md:h-[500px] lg:h-[500px] overflow-hidden"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {carouselData.map((item) => (
          <CarouselItem key={item.id}>
            <Card className="relative w-full h-full overflow-hidden rounded-lg shadow-md">
              <CardContent
                className="relative flex items-end justify-start w-full h-[400px] sm:h-[500px] md:h-[500px] lg:h-[500px] p-6 bg-cover bg-center transition-transform duration-300 hover:scale-105"
                style={{
                  backgroundImage: `url(${item.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="relative z-20 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm md:text-base">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
