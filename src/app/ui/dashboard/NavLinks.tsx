"use client";

import Link from "next/link";

export default function NavLinks() {
  return (
    <nav className="bg-emerald-500/5 z-10 backdrop-blur-xs p-4 sticky bottom-0 md:block border-1 border-emerald-500/10">
      <ul className="flex md:flex-col gap-2 justify-evenly">
        <li>
          <Link href={"/dashboard/profile"}>Profile</Link>
        </li>
        <li>
          <Link href={"/dashboard/myposts"}>My Posts</Link>
        </li>
        <li>
          <Link href={"/dashboard/users"}>Users</Link>
        </li>
        <li>
          <Link href={"/dashboard/newsfeed"}>News Feed</Link>
        </li>
      </ul>
    </nav>
  );
}
