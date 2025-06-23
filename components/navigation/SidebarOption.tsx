"use client";

import Link from "next/link";

import { IconType } from "react-icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavItemProps {
  icon: IconType;
  active: IconType;
  label: string;
  href: string;
  isActive: boolean;
}

const SidebarOption = ({
  icon: Icon,
  active: ActiveIcon,
  label,
  href,
  isActive,
}: NavItemProps) => {
  return (
    <Link href={href}>
      <Button
        variant={"sidebarbtn"}
        className={cn(
          "w-full lg:justify-start lg:gap-2 px-2",
          isActive
            ? "bg-transparent dark:bg-transparent border-primary text-primary dark:text-primary"
            : "cursor-pointer"
        )}
      >
        {isActive ? (
          <ActiveIcon className="size-6" />
        ) : (
          <Icon className="size-6" />
        )}
        <p className="hidden lg:block">{label}</p>
      </Button>
    </Link>
  );
};

export default SidebarOption;
