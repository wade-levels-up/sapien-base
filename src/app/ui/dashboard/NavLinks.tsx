"use client";

import Link from "next/link";

export default function NavLinks() {
  return (
    <nav className="bg-emerald-500/5 z-10 backdrop-blur-xs p-2 md:static fixed bottom-0 w-full md:w-[145px] border-1 border-emerald-500/10">
      <ul className="flex md:flex-col gap-2 justify-evenly">
        <li>
          <Link href={"/dashboard/profile"}>Profile</Link>
        </li>
        <li>
          <Link href={"/dashboard/users"}>Users</Link>
        </li>
        <li>
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}
