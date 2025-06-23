"use client";

import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

const Toast = () => {
  const pathname = usePathname();
  const isAdmin = pathname.includes("admin");
  const theme = isAdmin ? "dark" : "light";
  return <Toaster theme={theme} position="bottom-right" />;
};

export default Toast;
