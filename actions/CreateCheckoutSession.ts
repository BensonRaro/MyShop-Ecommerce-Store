"use server";

import Stripe from "stripe";

export const CreateCheckoutSession = async (items: cart[], email: string) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const itemsToCheckout = items.map((item) => ({
      quantity: item.qty,
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          description: item.description,
          images: [item.thumbnail, ...JSON.parse(item.images || "[]")],
        },
        unit_amount: item.price,
      },
    }));
    //   const host = process.env.NEXT_PUBLIC_HOST || "http://localhost:3000";
    const host =
      process.env.NODE_ENV === "production"
        ? "https://myshop254.vercel.app"
        : "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: itemsToCheckout,
      mode: "payment",
      success_url: `${host}/success`,
      cancel_url: `${host}/cart`,
      metadata: {
        email,
      },
      customer_email: email,
    });
    return {
      ok: true,
      id: session?.id,
    };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return {
      ok: false,
      error: "Failed to create checkout session",
    };
  }
};
