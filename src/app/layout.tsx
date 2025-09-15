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
import {
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

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
        <body
          className={`${turret_road.className} flex flex-col antialiased h-full min-h-screen`}
        >
          <header className="flex justify-between items-center py-1 px-4 border-b-1">
            <h1>Sapien Base</h1>
            <div className="flex gap-2">
              <SignedOut>
                <SignInButton>
                  <div className="button">
                    <FontAwesomeIcon icon={faRightToBracket} />
                    <p>Sign In</p>
                  </div>
                </SignInButton>
                <SignUpButton>
                  <div className="button">
                    <FontAwesomeIcon icon={faUserPlus} />
                    <p>Sign Up</p>
                  </div>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <div className="grow overflow-auto">{children}</div>
          <footer className="md:flex justify-end items-center p-4 gap-4 h-16 border-t-1 hidden">
            <a href="https://wadelevelsup.com/" target="blank">
              Made by Wade
            </a>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
