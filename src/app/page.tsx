"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <h1>Sapien Base</h1>
      <Link href="/login">
        <div className="flex gap-[6px] justify-between items-center p-2 border border-white rounded-xl hover:border-emerald-500 hover:text-emerald-500">
          <span>Log in</span>
          <FontAwesomeIcon icon={faRightToBracket} />
        </div>
      </Link>
    </div>
  );
}
