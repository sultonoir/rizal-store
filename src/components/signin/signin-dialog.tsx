"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { SigninForm } from "../form/signin/signin-form";
import { useDialogSignin } from "@/hooks/use-dialog-signin";

function SigninDialog() {
  const { isOpen, setIsOpen } = useDialogSignin();
  const isMobile = useIsMobile();

  if (!isMobile) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="sr-only">
            <DialogTitle>Signin</DialogTitle>
            <DialogDescription>Welcome to Rizal Store.</DialogDescription>
          </DialogHeader>
          <SigninForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader className="sr-only mt-2 text-left">
          <DrawerTitle>Signin</DrawerTitle>
          <DrawerDescription>Welcome to Rizal Store.</DrawerDescription>
        </DrawerHeader>
        <SigninForm className="p-4" />
        <DrawerFooter className="pt-4">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default SigninDialog;
