"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <nav>
      <ul>
        <li>
          <Link
            href={"/dashboard/profile"}
            className={`${
              pathname === "/dashboard/profile" && "text-emerald-500"
            }`}
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            href={"/dashboard"}
            className={`${pathname === "/dashboard" && "text-emerald-500"}`}
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </nav>
  );
}
