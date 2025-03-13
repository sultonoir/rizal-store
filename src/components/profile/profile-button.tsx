"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminMenulist, UserMenulist } from "@/lib/constants";
import React from "react";
import ProfileMenu from "./profile-menu";

interface ProfileButtonProps {
  role?: string | null;
  name: string;
  email: string;
  image?: string | null;
}

function ProfileButton({ role, name, email, image }: ProfileButtonProps) {
  const menulist = role === "admin" ? AdminMenulist : UserMenulist;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={image ?? "/avatar.png"} alt="@shadcn" />
            <AvatarFallback>{name.at(0) ?? "R"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium capitalize leading-none">
              {name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ProfileMenu menulists={menulist} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileButton;
