import Footer from "@/components/navigation/footer";
import Navbar from "@/components/navigation/navbar";
import DialogProvider from "@/provider/dialog-provider";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <DialogProvider />
    </>
  );
};

export default Layout;
