"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import MobileFilter from "@/components/shop/MobileFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sort } from "@/constants";

const ShopHeader = ({ products }: { products: product[] }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const createUrl = (sort: string) => {
    if (sort === "Clear") {
      params.delete("sort");
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.set("sort", sort);
      replace(`${pathname}?${params.toString()}`);
    }
  };
  const sort = searchParams.get("sort") || "Clear";

  return (
    <div className="flex justify-between sticky top-0">
      <h1 className="text-primary text-2xl md:text-4xl font-serif font-bold">
        Our Shop
      </h1>
      <div className="flex gap-1 items-center">
        <Select onValueChange={(value) => createUrl(value)} defaultValue={sort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Clear">Clear Sort</SelectItem>
            {Sort.map((sort) => (
              <SelectItem key={sort.sort} value={sort.sort}>
                {sort.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="md:hidden">
          <MobileFilter products={products} />
        </div>
      </div>
    </div>
  );
};

export default ShopHeader;
