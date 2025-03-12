import { db } from "../db";

export async function getCouponsById({ id }: { id?: string }) {
  const coupon = await db.coupon.findFirst({
    where: {
      id,
    },
  });

  return coupon;
}
