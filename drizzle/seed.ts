import { db } from "@/drizzle";
import items from "../products.json";
import { products } from "./schema";
import { randomUUID } from "crypto";

const seed = async () => {
  console.log("Seeding products...");
  try {
    for (const item of items) {
      const id = randomUUID();
      await db.insert(products).values({
        id,
        ...item,
      });
    }
    console.log("Products seeded successfully.");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};

seed();
