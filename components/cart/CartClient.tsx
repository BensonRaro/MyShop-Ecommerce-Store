"use client";

import { BsFillCartCheckFill, BsFillCartXFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useTransition } from "react";
import { toast } from "sonner";

import useCart from "@/store/useCart";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import CartCard from "./CartCard";
import { CreateCheckoutSession } from "@/actions/CreateCheckoutSession";
import { insertOrder } from "@/actions/InsertOrder";

const CartClient = () => {
  const cart = useCart();
  const router = useRouter();
  const session = authClient.useSession();
  const user = authClient.useSession();
  const [pending, startTransition] = useTransition();

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(cart.total()));

  const checkout = () => {
    // pickuppoint
    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );

    startTransition(async () => {
      try {
        const stripe = await stripePromise;
        if (!stripe) {
          console.log("Stripe not initialized");
          toast("Stripe not initialized");
          return;
        }

        const response = await CreateCheckoutSession(
          cart.items,
          user?.data?.user.email || ""
        );
        if (response.ok) {
          const items = cart.items;

          const order = {
            totalPrice: Number(cart.total()),
            items,
          };
          await insertOrder(order);
          stripe.redirectToCheckout({
            sessionId: response?.id || "",
          });
          cart.removeAll();
        } else {
          console.error("Failed to create checkout session:");
          toast("Failed to create checkout session");
        }
      } catch (error) {
        console.error("Error initializing Stripe:", error);
        toast("Error initializing Stripe");
      }
    });
  };
  return (
    <div className="flex items-center justify-center">
      <div className="mt-10 mb-20 lg:mb-10 w-full container">
        {/* cart */}
        {cart.items.length ? (
          <>
            {/* Cart header */}
            <div className="cart-header">
              <h3 className="text-xl font-extrabold flex gap-3">
                <BsFillCartCheckFill className="size-8 lg:block hidden" />
                Cart Items
              </h3>
              <div className="gap-3 flex text-lg font-semibold items-center">
                {/* no of items */}
                <span className="text-xl font-extrabold">
                  {cart.items.length} Items
                </span>
                {/* empty btn */}
                <Button
                  className="rounded-md flex gap-2"
                  onClick={cart.removeAll}
                >
                  <BsFillCartXFill className="size-6" />
                </Button>
              </div>
            </div>
            {/* Cart items payment card */}
            <div className="block lg:flex">
              {/* items */}
              <div className="w-full">
                {cart.items.map((item) => (
                  <div className="cartcard-div" key={item.id}>
                    <CartCard item={item} />
                  </div>
                ))}
              </div>
              {/* payment card */}
              <div className="mt-6 h-full rounded-lg border border-gray-400 p-6 shadow-md md:mt-0 lg:w-1/3">
                {/* subtotal */}
                <div className="mb-2 flex justify-between text-gray-400">
                  <p>SubTotal</p>
                  <p>{priceFormatter}</p>
                </div>
                <hr className="my-4" />
                {/* total */}
                <div className="flex justify-between mb-4">
                  <p className="text-lg font-bold">Total</p>
                  <p className="mb-1 text-lg font-bold">{priceFormatter}</p>
                </div>
                {session.data?.user ? (
                  <Button
                    onClick={checkout}
                    className="w-full"
                    disabled={pending}
                  >
                    Checkout
                  </Button>
                ) : (
                  <Button
                    onClick={() => router.push("/login")}
                    className="w-full"
                  >
                    Login to Checkout
                  </Button>
                )}
              </div>
            </div>
            {/* checkout btn */}
          </>
        ) : (
          <div className="cart-empty">Cart Is Empty</div>
        )}
      </div>
    </div>
  );
};

export default CartClient;
