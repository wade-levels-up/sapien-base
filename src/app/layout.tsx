import type { Metadata } from "next";
import "./globals.css";
import { turret_road } from "@/app/ui/fonts";

export const metadata: Metadata = {
  title: "Sapien Base",
  description: "A dystopian social media site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${turret_road.className} antialiased flex justify-center items-center min-h-[100vh]`}
      >
        {children}
      </body>
    </html>
  );
}
