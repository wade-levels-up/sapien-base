import { fetchUser } from "@/app/lib/data";
import Image from "next/image";
import AcceptDeclineFollowRequest from "./AcceptDeclineFollowPane";

type FollowRequestProps = {
  userId: string;
};

export default async function FollowRequest({ userId }: FollowRequestProps) {
  const user = await fetchUser(userId);

  if (!user) return null;

  return (
    <li className="bg-emerald-950 hover:bg-emerald-900 hover:cursor-pointer rounded-md flex flex-col gap-2 w-xs items-center">
      <div className="p-2 flex gap-3 w-full items-center">
        <div className="relative w-[48px] h-[48px] rounded-full border-1">
          {user.profilePicturePath && (
            <Image
              src={user.profilePicturePath}
              alt={`${user.firstName}'s Profile Picture`}
              fill
              sizes="48px"
              className="object-cover rounded-full"
            />
          )}
        </div>
        <p>
          {user.firstName} {user.lastName}
        </p>
      </div>
      <AcceptDeclineFollowRequest userId={user.id} />
    </li>
  );
}
