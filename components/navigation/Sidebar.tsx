"use client";

import { usePathname } from "next/navigation";
import {
  MdCreateNewFolder,
  MdOutlineCreateNewFolder,
  MdDashboard,
  MdOutlineDashboard,
} from "react-icons/md";
import { RiProductHuntFill, RiProductHuntLine } from "react-icons/ri";
import { FaDollarSign, FaShoppingCart } from "react-icons/fa";
import { BsCartCheck, BsFillCartCheckFill } from "react-icons/bs";

import SidebarOption from "@/components/navigation/SidebarOption";
import { authClient } from "@/lib/auth-client";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Sidebar = () => {
  const session = authClient.useSession();
  const userId = session.data?.user.id;
  const pathname = usePathname();
  const routes = [
    {
      label: "Dashboard",
      href: `/user/${userId}`,
      icon: MdOutlineDashboard,
      active: MdDashboard,
    },
    {
      label: "Cart",
      href: `/user/${userId}/cart`,
      icon: AiOutlineShoppingCart,
      active: FaShoppingCart,
    },
    {
      label: "Orders",
      href: `/user/${userId}/orders`,
      icon: BsCartCheck,
      active: BsFillCartCheckFill,
    },
  ];
  return (
    <div className="fixed h-[84vh] border rounded-md flex flex-col justify-between bg-card">
      <ul className="space-y-2 mt-4 lg:pt-0 p-2">
        {routes.map((route) => (
          <li className="w-full" key={route.href}>
            <SidebarOption
              key={route.href}
              label={route.label}
              icon={route.icon}
              active={route.active}
              href={route.href}
              isActive={pathname === route.href}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
