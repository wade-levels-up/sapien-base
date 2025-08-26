"use client";

import Link from "next/link";

export default function Login() {
  return (
    <div className="flex flex-col items-center">
      <h1>Log in</h1>
      <Link href="/dashboard" className="hover:text-emerald-500">
        Submit
      </Link>
    </div>
  );
}
