"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/context/AuthContext";
import { BlogContextProvider } from "@/context/BlogContextProvider";
import { Toaster } from "@/components/ui/sonner";

export default function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AuthProvider>
        <BlogContextProvider>
          {children}
          <Toaster />
        </BlogContextProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
