"use client";
import dynamic from "next/dynamic";
import React from "react";

const DialogCart = dynamic(() => import("@/components/cart/cart-dialog"), {
  ssr: false,
});

const DialogProvider = () => {
  return (
    <>
      <DialogCart />
    </>
  );
};

export default DialogProvider;
