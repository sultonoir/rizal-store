"use client";
import React from "react";
import { Button } from "../ui/button";
import { useDialogSignin } from "@/hooks/use-dialog-signin";
import { User2 } from "lucide-react";

const SigninButton = () => {
  const { setIsOpen } = useDialogSignin();
  return (
    <Button
      size="icon"
      onClick={setIsOpen}
      variant="ghost"
      className="relative rounded-full"
      aria-label="cart button"
    >
      <User2 />
    </Button>
  );
};

export default SigninButton;
