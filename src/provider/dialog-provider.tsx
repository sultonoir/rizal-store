"use client";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

const DialogCart = dynamic(() => import("@/components/cart/cart-dialog"), {
  ssr: false,
});

const FilterMobile = dynamic(
  () => import("@/components/filter/filter-mobile"),
  {
    ssr: false,
  },
);

const DialogProvider = () => {
  return (
    <Suspense>
      <DialogCart />
      <FilterMobile />
    </Suspense>
  );
};

export default DialogProvider;
