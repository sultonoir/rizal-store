"use client";

import React, { Suspense } from "react";
import FilterSorting from "./filter-sorting";
import dynamic from "next/dynamic";

interface FilterHeaderProps {
  title?: string;
  count: number;
}

const FilterMobileButton = dynamic(
  () => import("@/components/filter/filter-mobile-button"),
  {
    ssr: false,
  },
);

export default function FilterHeader({ title, count }: FilterHeaderProps) {
  return (
    <section className="flex w-full min-w-0 items-center justify-between gap-5">
      <div className="inline-flex items-center gap-2">
        {title ? (
          <h2 className="text-base capitalize leading-9 md:text-lg lg:text-2xl">
            Search for <span className="font-bold">{`" ${title} "`}</span>
          </h2>
        ) : (
          <h2 className="text-base capitalize leading-9 md:text-lg lg:text-2xl">
            All Products
          </h2>
        )}
        <p className="whitespace-nowrap text-sm leading-9 text-muted-foreground md:text-sm lg:mt-1 lg:text-base">
          {count} items
        </p>
      </div>
      <div className="flex items-center gap-2">
        <FilterMobileButton />
        <Suspense>
          <FilterSorting />
        </Suspense>
      </div>
    </section>
  );
}
