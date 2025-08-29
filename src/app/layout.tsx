import type { Metadata } from "next";
import { turret_road } from "@/app/ui/fonts";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Sapien Base",
  description: "A dystopian social media site",
};

export const dynamic = "force-dynamic";

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
