"use client";

import type { User } from "@/app/lib/definitions";
import { redirect } from "next/navigation";
import Image from "next/image";

type UserCardProps = {
  userData: User;
};

export default function UserCard({ userData }: UserCardProps) {
  const { firstName, lastName, profilePicturePath } = userData;
  const userName = (firstName + " " + lastName).trim();

  function handleNavigate() {
    redirect(`/dashboard/users/${userData.id}`);
  }

  return (
    <div
      onClick={handleNavigate}
      className="p-2 bg-emerald-950 hover:bg-emerald-900 hover:cursor-pointer rounded flex gap-2 w-3xs items-center"
    >
      <div className="relative w-[48px] h-[48px] rounded-full border-1">
        {profilePicturePath && (
          <Image
            src={profilePicturePath}
            alt={`${firstName}'s Profile Picture`}
            fill
            sizes="48px"
            className="object-cover rounded-full"
          />
        )}
      </div>
      <p className="ml-2">{userName !== "" ? userName : "Anonymous"}</p>
    </div>
  );
}
