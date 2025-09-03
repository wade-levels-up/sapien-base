"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <nav className="bg-emerald-500/5 p-4 border-r-1 border-emerald-500/10">
      <ul className="flex flex-col gap-2">
        <li>
          <Link href={"/dashboard/profile"}>Profile</Link>
        </li>
        <li>
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
        <li>
          <Link href={"/dashboard/newsfeed"}>News Feed</Link>
        </li>
      </ul>
    </nav>
  );
}
