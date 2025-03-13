"use client";
import React from "react";
import { Button } from "../ui/button";
import { useDialogSignin } from "@/hooks/use-dialog-signin";
import { User2 } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import ProfileButton from "../profile/profile-button";

const SigninButton = () => {
  const { setIsOpen } = useDialogSignin();
  const { data } = useSession();

  if (!data?.user) {
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
  }

  return <ProfileButton {...data.user} />;
};

export default SigninButton;
