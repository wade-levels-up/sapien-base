import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

// Keeping FontAwesome Imports here for syntax example until used in another component
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center h-full">
      <Image
        src="/jessica-christian-sI6T-OSRkpo-unsplash.jpg"
        alt="Rooftop views in Orlando at night"
        fill
        className="absolute object-cover z-0"
        priority
      />
      <SignedIn>
        <Link className="absolute top-[50%] text-3xl" href="/dashboard">
          Continue to dashboard
        </Link>
      </SignedIn>
    </div>
  );
}
