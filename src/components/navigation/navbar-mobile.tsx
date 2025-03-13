import React from "react";
import CartButton from "../cart/cart-button";
import SigninButton from "../signin/signin-button";
import Link from "next/link";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { MenuCategories } from "./menu-categories";

const NavbarMobile = () => {
  return (
    <div className="fixed bottom-0 z-10 flex w-full border-t bg-background py-2 md:hidden">
      <div className="container flex flex-row flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "rounded-full",
          )}
        >
          <Home />
        </Link>
        <MenuCategories />
        <CartButton />
        <SigninButton />
      </div>
    </div>
  );
};

export default NavbarMobile;
