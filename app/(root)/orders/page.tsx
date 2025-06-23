import { DataTable } from "@/components/global/data-table";
import Heading from "@/components/global/Heading";
import { columns } from "@/components/orders/columns";
import { db } from "@/drizzle";
import { orders } from "@/drizzle/schema";
import { auth } from "@/lib/auth";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

const OrdersPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const prouducts = await db.query.orders.findMany({
    where: eq(orders.userId, session?.user?.id || ""),
  });

  return (
    <div className="px-4 mt-4">
      <div className="mb-4">
        <Heading title={"View Orders"} description={"View Your Orders"} />
      </div>
      <DataTable columns={columns} data={prouducts} />
    </div>
  );
};

export default OrdersPage;
