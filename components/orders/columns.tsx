"use client";

import { ColumnDef } from "@tanstack/react-table";
import OrderedItems from "./OrderedItems";

import Moment from "react-moment";
import UserDetails from "./UserDetails";

export const columns: ColumnDef<order>[] = [
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-right">Total Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ordered At",
    cell: ({ row }) => <Moment fromNow>{row.getValue("createdAt")}</Moment>,
  },
  {
    accessorKey: "orderedItems",
    header: "Ordered Items",
    cell: ({ row }) => (
      <OrderedItems items={JSON.parse(row.getValue("orderedItems"))} />
    ),
  },
  {
    accessorKey: "userId",
    header: "User Details",
    cell: ({ row }) => <UserDetails userId={row.getValue("userId")} />,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
