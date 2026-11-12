import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/context/Providers";

export const metadata: Metadata = {
  title: "FreshCart",
  description: "FreshCart e-commerce store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-gray-50 text-gray-800 antialiased"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}