"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "../db";
import { getCouponsById } from "../coupon/coupon-service";
import { UpdateStockSchema } from "../stock/stock-model";
import { CreatePayment } from "./payment-model";
import { updateStock } from "../stock/stock-service";
import { GlobalResponse } from "@/types";

export async function createOrder({
  cart,
  promoId,
}: CreatePayment): Promise<GlobalResponse> {
  try {
    // Get coupon and user session
    const coupon = await getCouponsById({ id: promoId });
    const user = await auth.api.getSession({
      headers: await headers(),
    });

    // If user is not authenticated, redirect to sign-in page
    if (!user) {
      return {
        success: false,
        error: {
          message: "User not authenticated. Please sign in.",
        },
      };
    }

    // Get the cost and quantity of the cart items
    const { cost, quantity, products } = await getCostAndQuantity(cart);

    // Calculate the total cost after applying the coupon discount (if any)
    const totalCost = coupon?.discount ? cost - coupon.discount : cost;

    // Start a transaction
    await db.$transaction(async (tx) => {
      try {
        // Get the admin user for notifications
        const admin = await tx.user.findFirst({
          where: {
            role: "admin",
          },
        });

        // Update stock
        const { error } = await updateStock({
          cart,
          name: user.user.name,
          email: user.user.email,
        });
        if (error) {
          throw new Error(error.message); // If stock update fails, throw error
        }

        // Create the payment record
        const payment = await tx.checkout.create({
          data: {
            userId: user.user.id,
            price: totalCost,
            quantity,
            status: "paid",
          },
        });

        // Create the checkout items
        await tx.checkoutItem.createMany({
          data: products.map((item) => ({
            checkoutId: payment.id,
            productId: item.id,
            quantity: item.amount,
            size: item.size,
            price: item.price * item.amount,
          })),
        });

        // Create notifications
        await tx.notifi.create({
          data: {
            userId: user.user.id,
            checkoutId: payment.id,
            message: "Complete your order",
          },
        });

        // Notify the admin about the order
        await tx.notifi.create({
          data: {
            userId: admin?.id,
            checkoutId: payment.id,
            message: "Order is received, process the order immediately",
          },
        });

        // Record coupon usage if a coupon was applied
        if (coupon) {
          await tx.couponConsume.create({
            data: {
              userId: user.user.id,
              couponId: coupon.id,
            },
          });
        }
      } catch (error) {
        // If any error occurs during the transaction, throw it so it can be caught
        throw new Error(
          error instanceof Error
            ? error.message
            : "An unknown error occurred during the transaction.",
        );
      }
    });

    // If everything is successful, return a success response
    return {
      success: true,
    };
  } catch (error) {
    // Catch any error that occurs outside the transaction block
    return {
      success: false,
      error: {
        message:
          error instanceof Error
            ? error.message
            : "An unknown error occurred during the order creation.",
      },
    };
  }
}

export async function getCostAndQuantity(params: UpdateStockSchema[]) {
  // Ambil semua produk dengan ID yang sesuai dengan `productId` yang ada di params
  const products = await db.product.findMany({
    where: {
      id: {
        in: params.map((param) => param.productId),
      },
    },
    select: {
      id: true,
      priceAfterDiscount: true,
    },
  });

  // Membuat map dari produk untuk mengakses produk secara langsung berdasarkan productId
  const productMap = new Map(products.map((product) => [product.id, product]));

  // Proses parameter untuk mendapatkan informasi harga dan jumlah produk yang valid
  const result = params
    .map((item) => {
      const product = productMap.get(item.productId);

      if (!product) {
        return null; // jika produk tidak ditemukan, abaikan item tersebut
      }

      return {
        price: product.priceAfterDiscount,
        amount: item.amount,
        id: product.id,
        size: item.size,
      };
    })
    .filter((item) => item !== null); // Menghapus item yang tidak ditemukan

  // Menghitung total quantity dan cost
  const quantity = result.reduce((cur, acc) => cur + acc.amount, 0);
  const cost = result.reduce((cur, acc) => cur + acc.amount * acc.price, 0);

  return {
    quantity,
    cost,
    products: result,
  };
}
