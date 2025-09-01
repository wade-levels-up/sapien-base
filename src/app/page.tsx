import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

// Keeping FontAwesome Imports here for syntax example until used in another component
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1>Sapien Base</h1>
      <SignedIn>
        <Link href="/dashboard">Continue to dashboard</Link>
      </SignedIn>
    </div>
  );
}
