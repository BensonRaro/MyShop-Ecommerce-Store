"use server";

import { db } from "@/drizzle";
import { user } from "@/drizzle/schema";
import { auth } from "@/lib/auth";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function upateUser(value: string) {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  if (!session?.user) return;
  try {
    await db
      .update(user)
      .set({
        pickupPoint: value,
      })
      .where(eq(user.id, session.user.id));
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
