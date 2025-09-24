"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="bg-emerald-500/5 z-10 backdrop-blur-xs p-2 md:static fixed bottom-0 w-full md:w-[145px] border-1 border-emerald-500/10">
      <ul className="flex md:flex-col gap-2 justify-evenly">
        <li>
          <Link
            className={
              pathname === "/dashboard/profile" ? "text-emerald-500" : ""
            }
            href={"/dashboard/profile"}
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            className={
              pathname === "/dashboard/users" ? "text-emerald-500" : ""
            }
            href={"/dashboard/users"}
          >
            Users
          </Link>
        </li>
        <li>
          <Link
            className={pathname === "/dashboard" ? "text-emerald-500" : ""}
            href={"/dashboard"}
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
}
