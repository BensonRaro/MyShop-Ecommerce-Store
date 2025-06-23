import { cn } from "@/lib/utils";
import useCart from "@/store/useCart";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { toast } from "sonner";

const CartCard = ({ item, use }: { item: cart; use?: string }) => {
  const router = useRouter();
  const cart = useCart();
  const total = item.qty * item.price;
  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(total);

  const IncQty = () => {
    if (item.available > item.qty) {
      const product = {
        ...item,
        qty: item.qty + 1,
      };
      cart.updateQty(product);
    } else {
      toast.error("You cannot add more than available quantity");
    }
  };
  const DecQty = () => {
    const product = {
      ...item,
      qty: item.qty - 1,
    };
    cart.updateQty(product);
  };
  return (
    <>
      <div className="flex gap-2">
        <Image
          src={item.thumbnail}
          alt={item.title}
          width={300}
          height={300}
          className="rounded-lg size-24"
          onClick={() => router.push(`/details/${item.id}`)}
        />
        <span className="mt-2">
          <h2 className="text-lg font-bold line-clamp-2">{item.title}</h2>
        </span>
      </div>
      <div className="flex mt-4 justify-between sm:block sm:space-y-6 sm:mt-0 sm:space-x-6">
        <div className="flex items-center border-gray-100 text-black">
          <span
            className={cn(
              "cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-primary",
              use && "hidden"
            )}
            onClick={DecQty}
          >
            <AiOutlineMinus className="size-5" />
          </span>
          <span
            className={cn(
              "border bg-white text-center text-lg font-semibold outline-none",
              use ? "rounded-md p-1 ml-5" : "size-8"
            )}
          >
            {use && <span className="mr-2">Quantity</span>}
            {item.qty}
          </span>
          <span
            className={cn(
              "cursor-pointer rounded-r bg-gray-100 py-1 px-3.5 duration-100 hover:bg-primary",
              use && "hidden"
            )}
            onClick={IncQty}
          >
            <AiOutlinePlus className="size-5" />
          </span>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <span
              className="p-2 border rounded-full size-10 text-center"
              style={{ backgroundColor: item.colors }}
            />
            <div className="p-2 border rounded-lg w-fit h-12 text-center border-primary">
              {item.sizes}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-base font-semibold">{totalPrice}</p>
            <AiFillDelete
              onClick={() => cart.removeItem(item.id)}
              className={cn(
                "size-7 cursor-pointer duration-150 hover:text-red-500",
                use && "hidden"
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
