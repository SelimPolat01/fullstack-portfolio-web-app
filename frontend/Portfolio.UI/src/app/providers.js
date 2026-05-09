"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
}
