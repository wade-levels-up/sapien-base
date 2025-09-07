import { currentUser } from "@clerk/nextjs/server";
import { fetchUser } from "@/app/lib/data";
import UserBioSection from "@/app/ui/dashboard/UserBioSection";
import Image from "next/image";

export default async function Profile() {
  const user = await currentUser();
  const dbUser = await fetchUser();

  return (
    <div className="w-full flex flex-col items-center gap-4 py-4">
      <h2>{`${user?.firstName}'s Profile`}</h2>
      <span className="flex">
        <p>Details securely provided by</p>
        <a className="ml-1" href="http://clerk.com/" target="_blank">
          Clerk
        </a>
      </span>
      <div className="flex gap-4 flex-col md:flex-row items-center">
        <div className="relative w-[192px] h-[192px] md:w-[256px] md:h-[256px]">
          {user?.hasImage && (
            <Image
              src={user?.imageUrl}
              alt={`${user?.firstName}'s Picture`}
              fill
              sizes="256px"
              className="cover rounded-xl border-2 border-emerald-950"
            />
          )}
        </div>
        <ul>
          <li>
            Full Name: {user?.firstName} {user?.lastName}
          </li>
          <li>
            Joined:{" "}
            {user?.createdAt && new Date(user.createdAt).toLocaleDateString()}
          </li>
          <li>
            Last Active:{" "}
            {user?.lastActiveAt && new Date(user.lastActiveAt).toLocaleString()}
          </li>
          {user?.phoneNumbers && user.phoneNumbers.length > 0 && (
            <li>
              Phone Numbers:{" "}
              {user.phoneNumbers.map((phone) => phone.phoneNumber).join(", ")}
            </li>
          )}
          <li>
            Connected Accounts:{" "}
            {user?.externalAccounts.map((acc) => acc.provider).join(", ")}
          </li>
        </ul>
      </div>
      <UserBioSection bio={dbUser?.bio} />
    </div>
  );
}
