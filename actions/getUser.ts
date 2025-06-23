"use server";

import { db } from "@/drizzle";
import { user } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getUser(userId: string) {
  try {
    const userData = await db.query.user.findFirst({
      where: eq(user.id, userId || ""),
    });
    return {
      ok: true,
      user: userData,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
}
