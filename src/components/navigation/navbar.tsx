import React from "react";
import Logo from "./logo";
import { DarkMode } from "../ui/dark-mode";
import { MenuNavbar } from "./menu-navbar";
import { SearchForm } from "../form/search-form";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-background p-2">
      <nav className="container flex flex-col gap-1">
        <div className="flex flex-row items-center justify-between gap-4">
          <Logo />
          <SearchForm className="flex-grow" />
          <DarkMode />
        </div>
        <MenuNavbar className="hidden lg:flex" />
      </nav>
    </header>
  );
};

export default Navbar;
