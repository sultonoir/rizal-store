import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type LogoProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

const Logo = ({ className }: LogoProps) => {
  return (
    <Link
      href="/"
      prefetch={true}
      className={cn("inline-flex w-fit items-center", className)}
    >
      <Image src="/logo.png" height={40} width={40} alt="logo" priority />
      <p className="hidden text-lg font-bold lg:block">Rizal Store</p>
    </Link>
  );
};

export default Logo;
