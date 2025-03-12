"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useDialogCart } from "@/hooks/use-dialog-cart";

const CartButton = () => {
  const { cart } = useCart();
  const { setCartOpen } = useDialogCart();
  const totalQuantity = cart.reduce((cur, acc) => cur + acc.amount, 0);
  return (
    <Button
      size="icon"
      onClick={setCartOpen}
      variant="ghost"
      className="relative rounded-full"
    >
      {totalQuantity > 0 && (
        <div className="absolute -right-[9px] -top-[4px] flex size-5 items-center justify-center rounded-full bg-primary text-xs leading-none text-white lg:-right-1 lg:top-0">
          {totalQuantity > 99 ? "99+" : totalQuantity}
        </div>
      )}
      <ShoppingBag />
    </Button>
  );
};

export default CartButton;
