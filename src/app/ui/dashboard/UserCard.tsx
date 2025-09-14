"use client";

import type { User } from "@/app/lib/definitions";
import { redirect } from "next/navigation";
import Image from "next/image";

type UserCardProps = {
  userData: User;
};

export default function UserCard({ userData }: UserCardProps) {
  const { firstName, lastName, profilePicturePath } = userData;

  function handleNavigate() {
    redirect(`/dashboard/users/${userData.id}`);
  }

  return (
    <div
      onClick={handleNavigate}
      className="p-2 bg-emerald-950 hover:bg-emerald-900 hover:cursor-pointer rounded flex gap-2 w-xs items-center"
    >
      <div className="relative w-[80px] h-[80px] rounded-full border-1">
        {profilePicturePath && (
          <Image
            src={profilePicturePath}
            alt={`${firstName}'s Profile Picture`}
            fill
            sizes="80px"
            className="object-cover rounded-full"
          />
        )}
      </div>
      <p>
        {firstName} {lastName}
      </p>
    </div>
  );
}
