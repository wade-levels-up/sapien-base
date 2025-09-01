import { type Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { turret_road } from "@/app/ui/fonts";
import "./globals.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Sapien Base",
  description: "Social Media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${turret_road.className} antialiased`}>
          <header className="flex justify-end items-center p-4 gap-4 h-16 border-b-1">
            <SignedOut>
              <span className="border border-white rounded-xl p-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faRightToBracket} />
                <SignInButton />
              </span>
              <span className="border border-white rounded-xl p-2">
                <SignUpButton />
              </span>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
