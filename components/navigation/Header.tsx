import Image from "next/image";
import Link from "next/link";
import { eq } from "drizzle-orm";
import { Suspense } from "react";
import { headers } from "next/headers";

import Search from "./Search";
import Actions from "./Actions";
import { auth } from "@/lib/auth";
import { db } from "@/drizzle";
import { user } from "@/drizzle/schema";

const Header = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const signedInUser = await db.query.user.findFirst({
    where: eq(user.id, session?.user?.id || ""),
  });

  const isAdmin = signedInUser?.role === "ADMIN";

  return (
    <div className="header">
      <div className="screen justify-between flex">
        <Link href={"/"}>
          <div className="flex items-center gap-x-4 hover:opacity-75 transition ease-in-out">
            <div className="header-img">
              <Image
                src={"/favicon.ico"}
                alt="Logo"
                width={35}
                height={35}
                className="rounded-full size-8"
              />
            </div>
            <div className="hidden lg:block">
              <p className="font-semibold font-serif">My Shop</p>
            </div>
          </div>
        </Link>
        <Suspense>
          <Search />
        </Suspense>
        <Actions isAdmin={isAdmin} />
      </div>
    </div>
  );
};

export default Header;
