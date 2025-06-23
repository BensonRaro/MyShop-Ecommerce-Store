"use server";

import { db } from "@/drizzle";
import { orders, products } from "@/drizzle/schema";
import { auth } from "@/lib/auth";

import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function insertOrder(order: {
  totalPrice: number;
  items: cart[];
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return;

  const id = randomUUID();
  try {
    for (const item of order.items) {
      await db
        .update(products)
        .set({
          available: item.available - item.qty,
        })
        .where(eq(products.id, item.id));
    }
    await db.insert(orders).values({
      id: id,
      totalPrice: order.totalPrice,
      userId: session.user.id,
      status: "processing",
      orderedItems: JSON.stringify(order.items),
    });
    revalidatePath("/", "layout");
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
}
