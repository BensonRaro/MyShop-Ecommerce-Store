"use client";

import { Button } from "@/components/ui/button";
import ImageGallery from "./ImageGallery";
import DetailsCard from "../global/DetailsCard";
import useCart from "@/store/useCart";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

const ItemDetails = ({ product }: { product: product }) => {
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

  const images: string[] = [
    product.thumbnail,
    ...JSON.parse(product.images || ""),
  ];

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);

  const createPageUrl = (
    filter: "size" | "color" | "category",
    value: string
  ) => {
    params.set(filter, value.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const selectedColor = searchParams.get("color") || "";
  const selectedSize = searchParams.get("size") || "";

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
          sizes: selectedSize,
          colors: selectedColor,
          qty: existingItem.qty,
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
        sizes: selectedSize,
        colors: selectedColor,
        qty: 1,
      };
      cart.addItem(productDetails);
      // toast.success(`${product.title} added to cart.`);
    }
  };
  return (
    <div className="w-full">
      {/* cart btn */}
      <div className="flex gap-4 float-right -mt-8 lg:mt-0 z-50">
        <Button className="mb-4 float-right mr-4" onClick={addToCart}>
          Add to Cart
        </Button>
      </div>
      <div className="block lg:flex gap-5">
        <div className="w-full flex flex-col justify-center items-center mt-10 lg:mt-0">
          {images.length > 0 && <ImageGallery images={images} />}
        </div>
        <div className="w-full">
          {/* name & price */}
          <div className="mt-2 space-y-3 lg:pl-3">
            {/* name */}
            <h2 className="text-2xl md:text-3xl font-bold line-clamp-1 mb-3">
              {product.title}
            </h2>
            {/* Price */}
            <div className="flex flex-col">
              <span className="text-primary text-lg font-bold">Price</span>
              <span className="font-bold text-xl">
                {product.discount > 0 && (
                  <span className="line-through italic text-sm text-gray-400">
                    {TotalPrice}
                  </span>
                )}
                <span className="text-base"> {formattedPrice}</span>
              </span>
            </div>
            <div className="space-y-2">
              <ul className="gap-2 flex flex-wrap">
                {/* colors */}
                {JSON.parse(product.colors).map(
                  (color: string, index: number) => (
                    <DetailsCard
                      key={index}
                      index={index}
                      use="color"
                      item={color}
                      selectedValue={selectedColor}
                      select={createPageUrl}
                    />
                  )
                )}
              </ul>
              <ul className="gap-2 flex flex-wrap">
                {/* sizes */}
                {JSON.parse(product.sizes || "").map(
                  (size: string, index: number) => (
                    <DetailsCard
                      key={index}
                      index={index}
                      use="size"
                      item={size}
                      selectedValue={selectedSize}
                      select={createPageUrl}
                    />
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 md:pl-4 overflow-auto">
        <div className="text-2xl font-bold text-primary">Description</div>
        <div className="lg:ml-28 ml-2 text-sm lg:text-base">
          {product.description}
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
