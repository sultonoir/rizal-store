import { GlobalResponse } from "@/types";
import { db } from "../db";
import { UpdateStockSchema } from "./stock-model";

export async function updateStock({
  cart,
  name,
  email,
}: {
  cart: UpdateStockSchema[];
  name: string;
  email: string;
}): Promise<GlobalResponse> {
  const stockCheckPromises = cart.map((item) =>
    db.stockAndSize.findFirst({
      where: {
        productId: item.productId,
        name: item.size,
      },
      select: { id: true, amount: true },
    }),
  );

  const stockItems = await Promise.all(stockCheckPromises);

  const insufficientStockItems = cart.filter((item, index) => {
    return !stockItems[index] || stockItems[index].amount < item.amount;
  });

  if (insufficientStockItems.length > 0) {
    return {
      success: false,
      error: {
        message: `Stock is insufficient for the following items: ${insufficientStockItems
          .map(
            (item) =>
              `${item.size} of product ${item.productId} (Requested: ${item.amount}, Available: ${
                stockItems[cart.indexOf(item)]?.amount ?? 0
              })`,
          )
          .join(", ")}`,
      },
    };
  }

  // Batch update stock in one transaction
  const updatePromises = cart.map((item, index) =>
    db.stockAndSize.update({
      where: {
        id: stockItems[index]?.id,
      },
      data: {
        amount: {
          decrement: item.amount,
        },
      },
    }),
  );

  // Create sell records
  const sellPromises = cart.map((item) =>
    db.selling.create({
      data: {
        amount: item.amount,
        productId: item.productId,
        name,
        email,
      },
    }),
  );

  try {
    // Execute all updates and sells in one transaction
    await db.$transaction([...updatePromises, ...sellPromises]);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: {
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
    };
  }
}
