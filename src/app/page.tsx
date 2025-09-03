import { SignedIn } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

// Keeping FontAwesome Imports here for syntax example until used in another component
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center">
      <Image
        src="/jessica-christian-sI6T-OSRkpo-unsplash.jpg"
        alt="Rooftop views in Orlando at night"
        width={5472}
        height={3648}
      />
      <SignedIn>
        <Link className="absolute top-[50%] text-3xl" href="/dashboard">
          Continue to dashboard
        </Link>
      </SignedIn>
    </div>
  );
}
