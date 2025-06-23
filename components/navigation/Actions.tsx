"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiLoader } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import UserButton from "./UserButton";
import useCart from "@/store/useCart";

const Actions = ({ isAdmin }: { isAdmin: boolean }) => {
  const router = useRouter();
  const session = authClient.useSession();
  const cart = useCart();
  return (
    <div className="flex items-center justify-end gap-x-2 ml-2 lg:ml-0">
      {!session.isPending && !session.data && (
        <Button onClick={() => router.push("/login")}>Login</Button>
      )}
      {/* Cart */}
      <div
        className="space-x-2 flex relative cursor-pointer mt-0.5"
        onClick={() => router.push("/cart")}
      >
        <div className="py-1 px-3.5">
          <AiOutlineShoppingCart className="size-8" />
          <div className="cart-number">{cart.items.length}</div>
        </div>
      </div>
      {/*Loader  */}
      {session.isPending && <FiLoader className="animate-spin size-8" />}
      {session.data && <UserButton isAdmin={isAdmin} />}
    </div>
  );
};

export default Actions;
