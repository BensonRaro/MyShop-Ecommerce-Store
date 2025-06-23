"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import useCart from "@/store/useCart";

const ProductCard = ({ product }: { product: product }) => {
  const price =
    product.discount > 0 ? product.price - product.discount : product.price;
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
  const TotalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  const cart = useCart();
  // add product to cart
  const addToCart = () => {
    if (product.available === 0) {
      toast.error("Product is out of stock");
      return;
    }

    const items = cart.items;
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
      if (product.available > existingItem.qty) {
        const productDetails = {
          ...product,
          price: price,
          sizes: JSON.parse(product.sizes || "")[0],
          colors: JSON.parse(product.colors || "")[0],
          qty: existingItem.qty + 1,
        };
        cart.addItem(productDetails);
        // toast.success(`${product.title} quantity updated.`);
      } else {
        toast.error("Product is out of stock");
      }
    } else {
      const productDetails = {
        ...product,
        price: price,
        sizes: JSON.parse(product.sizes || "")[0],
        colors: JSON.parse(product.colors || "")[0],
        qty: 1,
      };
      cart.addItem(productDetails);
      // toast.success(`${product.title} added to cart.`);
    }
  };
  return (
    <div className="size-full space-y-4 bg-[#f7f5f5] dark:bg-[#18181B] rounded-md p-2">
      <Link href={`/details/${product.id}`}>
        <div className="aspect-square relative rounded-md">
          <Image
            src={product.thumbnail}
            fill
            alt="Product Image"
            className="thumbnail"
          />
        </div>
      </Link>
      <div>
        <div className="flex gap-x-3 p-2">
          <div className="flex flex-col text-sm overflow-hidden">
            <Link
              href={`/details/${product.id}`}
              className="truncate font-semibold text-base hover:text-primary"
            >
              {product.title}
            </Link>
            <div className="mt-1">
              <span className="text-primary text-lg font-semibold">
                <span className="font-medium gap-2 flex">
                  {product.discount > 0 && (
                    <span className="line-through italic text-sm text-gray-400">
                      {TotalPrice}
                    </span>
                  )}
                  <span className="text-base">{formattedPrice}</span>
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <ul className="gap-2 flex flex-wrap">
            {JSON.parse(product.colors).map((color: string, index: number) => (
              <li
                key={index}
                className="size-8 rounded-full"
                style={{ backgroundColor: color }}
              ></li>
            ))}
          </ul>
          {product.sizes && (
            <ul className="gap-2 flex flex-wrap">
              {JSON.parse(product.sizes).map((size: string, index: number) => (
                <li
                  key={index}
                  className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                >
                  {size}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button onClick={addToCart} className="mb-4 float-right mr-4">
          Add To Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
