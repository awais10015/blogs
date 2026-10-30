import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/component/Navbar";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Read and share stories, notes, and ideas.",
  openGraph: {
    title: "Blogs",
    description: "Stories, notes, and ideas worth sitting with.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-[#c8f5d8] via-[#a0f1bd] to-[#d2f8dc] text-[#1f3318] dark:from-[#152411] dark:via-[#1f3318] dark:to-[#243d1c] dark:text-[#d2f8dc]">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
