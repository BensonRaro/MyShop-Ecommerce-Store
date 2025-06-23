"use client";

import { IoSearch } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Search = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);
  const query = searchParams.get("q");

  const [value, setValue] = useState(query || "");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;

    const isShop = pathname.includes("/shop");

    if (isShop) {
      params.set("q", value);
      replace(`${pathname}?${params.toString()}`);
    } else {
      router.push(`/shop?q=${value}`);
    }
  };

  const onClear = () => {
    if (query) {
      params.delete("q");
      replace(`${pathname}?${params.toString()}`);
    }
    setValue("");
  };
  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full lg:w-[400px] flex items-center"
    >
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 bg-transparent dark:bg-transparent"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          type="button"
          className="absolute right-9"
          onClick={onClear}
        >
          <IoMdClose className="text-muted-foreground cursor-pointer hover:opacity-75 transition ease-in-out" />
        </Button>
      )}
      <Button
        variant="ghost"
        size="icon"
        type="submit"
        className="rounded-l-none border border-stone-200 dark:border-stone-800"
      >
        <IoSearch className="size-5" />
      </Button>
    </form>
  );
};

export default Search;
