"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { usePathname } from "next/navigation";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const pathname = usePathname();
  const isAdmin = pathname.includes("admin");
  const theme = isAdmin ? "dark" : "light";

  return (
    <NextThemesProvider forcedTheme={theme} {...props}>
      {children}
    </NextThemesProvider>
  );
}
