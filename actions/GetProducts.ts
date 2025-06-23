"use server";

import { db } from "@/drizzle";

export async function getProducts(
  page: number,
  pageSize: number,
  category: string,
  size: string,
  color: string,
  q: string,
  sort: string
) {
  const AllProducts = await db.query.products.findMany({
    orderBy:
      sort === "newest"
        ? (product, { desc }) => desc(product.createdAt)
        : (product, { asc }) => asc(product.createdAt),
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });

  const products = AllProducts.filter(
    (product) => product.available > 0 && product.isArchived === "true"
  );

  if (!products) {
    return [];
  }

  if (sort === "HighToLow") {
    return products.sort(
      (a, b) => b.price - b.discount - (a.price - a.discount)
    );
  } else if (sort === "LowToHigh") {
    return products.sort(
      (a, b) => a.price - a.discount - (b.price - b.discount)
    );
  }

  if (size) {
    return products.filter((product) => product?.sizes?.includes(size));
  }

  if (color) {
    return products.filter((product) => product?.colors?.includes(size));
  }

  if (category) {
    if (category === "all") {
      //   return products.filter((product) => product);
      return products;
    } else {
      return products.filter((product) => product?.category === category);
    }
  }

  if (q) {
    return products.filter((product) =>
      product.title.toLowerCase().includes(q.toLowerCase())
    );
  }

  return products;
}
