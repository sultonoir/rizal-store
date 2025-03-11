"use client";
import React from "react";
import { ThemeProvider } from "./theme-provider";
import { ImageKitProvider } from "imagekitio-next";
import { Toaster } from "@/components/ui/sonner";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ImageKitProvider urlEndpoint={urlEndpoint}>{children}</ImageKitProvider>
      <Toaster richColors position="top-center" />
    </ThemeProvider>
  );
};
