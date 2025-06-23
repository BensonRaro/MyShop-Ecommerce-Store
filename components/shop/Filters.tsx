"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Category } from "@/constants";
import DetailsCard from "@/components/global/DetailsCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const Filters = ({ products }: { products: product[] }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  const colors = products
    ? Array.from(
        new Set(products.flatMap((product) => JSON.parse(product.colors || "")))
      )
    : [];

  const sizes = products
    ? Array.from(
        new Set(products.flatMap((product) => JSON.parse(product.sizes || "")))
      )
    : [];

  const createUrl = (
    filter: "size" | "color" | "category",
    value: string,
    selected: string
  ) => {
    if (selected === value) {
      params.delete(filter);
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.set(filter, value.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const category = searchParams.get("category");
  const selectedColor = searchParams.get("color");
  const selectedSize = searchParams.get("size");

  return (
    <div className="space-y-2 w-full p-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-primary">Filters</h2>
        <Button onClick={() => router.push("/shop")}>Clear Filters</Button>
      </div>
      <ScrollArea className="h-[30vh] w-full border rounded-md p-2">
        <h2 className="text-xl font-bold text-primary mb-2 top-0 z-30 sticky bg-white p-1">
          Categories
        </h2>
        {Category.map((cat) => (
          <div key={cat} className="flex items-center space-x-2 pb-2">
            <Checkbox
              id={cat}
              checked={category === cat}
              onCheckedChange={() => createUrl("category", cat, category || "")}
            />
            <label htmlFor={cat} className="text-sm leading-none">
              {cat}
            </label>
          </div>
        ))}
      </ScrollArea>
      <ScrollArea className="h-[20vh] w-full border rounded-md p-2">
        <h2 className="text-xl font-bold text-primary mb-2 top-0 z-30 sticky bg-white p-1">
          Colors
        </h2>
        {colors.length === 0 ? (
          <h1 className="text-primary text-2xl flex items-center justify-center">
            No Colors
          </h1>
        ) : (
          <ul className="gap-2 flex flex-wrap">
            {colors.map((color, i) => (
              <DetailsCard
                key={color}
                index={i}
                item={color}
                selectedValue={selectedColor || ""}
                select={createUrl}
                use="color"
              />
            ))}
          </ul>
        )}
      </ScrollArea>
      <ScrollArea className="h-[20vh] w-full border rounded-md p-2">
        <h2 className="text-xl font-bold text-primary mb-2 top-0 z-30 sticky bg-white p-1">
          Sizes
        </h2>
        {colors.length === 0 ? (
          <h1 className="text-primary text-2xl flex items-center justify-center">
            No Sizes
          </h1>
        ) : (
          <ul className="gap-2 flex flex-wrap">
            {sizes.map((size, i) => (
              <DetailsCard
                key={size}
                index={i}
                item={size}
                selectedValue={selectedSize || ""}
                select={createUrl}
                use="size"
              />
            ))}
          </ul>
        )}
      </ScrollArea>
    </div>
  );
};

export default Filters;
