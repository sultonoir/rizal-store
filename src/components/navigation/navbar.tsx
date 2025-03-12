import React from "react";
import Logo from "./logo";
import { DarkMode } from "../ui/dark-mode";
import { MenuNavbar } from "./menu-navbar";
import { SearchForm } from "../form/search-form";
import CartButton from "@/components/cart/cart-button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background p-2">
      <nav className="container flex flex-col gap-1">
        <div className="flex flex-row items-center justify-between gap-4">
          <Logo className="flex-none" />
          <SearchForm className="flex-grow" />
          <div className="flex flex-none items-center gap-2">
            <DarkMode />
            <CartButton />
          </div>
        </div>
        <MenuNavbar className="hidden lg:flex" />
      </nav>
    </header>
  );
};

export default Navbar;
