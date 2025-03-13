"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Promo } from "@prisma/client";
import { Image } from "@unpic/react/nextjs";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CarouselProps {
  hero: Promo[];
  autoSlideInterval?: number;
}

function PromoHero({ hero, autoSlideInterval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((current) =>
      current === hero.length - 1 ? 0 : current + 1,
    );
  }, [hero.length]);

  const previousSlide = () => {
    setCurrentIndex((current) =>
      current === 0 ? hero.length - 1 : current - 1,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const slideTimer = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);

    return () => clearInterval(slideTimer);
  }, [nextSlide, autoSlideInterval]);

  return (
    <div className="relative isolate mx-auto w-full max-w-screen-lg">
      <div className="relative overflow-hidden rounded-2xl">
        {/* Slides */}
        <div
          className="h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <div className="flex h-full w-full">
            {hero.map((image) => (
              <div
                key={image.id}
                className="relative isolate h-full w-full flex-shrink-0"
              >
                <Image
                  key={image.id}
                  src={image.image}
                  alt={image.title}
                  className="object-cover"
                  width={1028}
                  height={400}
                  layout="constrained"
                />
                <Link href={`/promotions/${image.slug}`}>
                  <span className="absolute inset-0 z-10" />
                  <span className="sr-only">{image.title}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={previousSlide}
          className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black shadow-md transition-all hover:bg-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-black shadow-md transition-all hover:bg-white"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
          {hero.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "relative size-4 overflow-hidden rounded-full border bg-white/80 p-0.5 shadow-sm backdrop-blur-lg transition-all hover:bg-white dark:border-white/80",
              )}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={cn("size-full rounded-full", {
                  "bg-primary": currentIndex === index,
                })}
              ></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PromoHero;
