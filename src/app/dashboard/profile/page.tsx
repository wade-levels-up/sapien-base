import { currentUser } from "@clerk/nextjs/server";
import { fetchUser, fetchUserPosts } from "@/app/lib/data";
import UserBioSection from "@/app/ui/dashboard/UserBioSection";
import Image from "next/image";
import { redirect } from "next/navigation";
import FollowRequest from "@/app/ui/dashboard/FollowRequest";
import UserCard from "@/app/ui/dashboard/UserCard";
import OptimisticPosts from "@/app/ui/dashboard/OptimisticPosts";

export default async function Profile() {
  const user = await currentUser();

  if (!user) redirect("/");

  const dbUser = await fetchUser(user.id);

  const userPosts = await fetchUserPosts(user.id);

  return (
    <>
      <h2 className="w-full text-center">Your Profile</h2>
      <div className="md:grid md:grid-cols-2 md:auto-rows-auto w-full flex flex-col items-center gap-12 py-4 flex-wrap">
        <section className="md:w-full flex flex-col items-center p-2">
          <div className="flex gap-4 flex-col md:flex-row md:flex-wrap items-center">
            <div className="relative w-[192px] h-[192px] md:w-[256px] md:h-[256px] md:min-w-[256px]">
              <Image
                src={user.imageUrl || "/user.jpg"}
                alt={`${user?.firstName}'s Picture`}
                fill
                sizes="256px"
                className="cover rounded-xl border-2 border-emerald-950"
              />
            </div>
            <ul className="md:text-left min-w-[300px]">
              <li>
                Full Name: {user?.firstName} {user?.lastName}
              </li>
              <li>
                Joined:{" "}
                {user?.createdAt &&
                  new Date(user.createdAt).toLocaleDateString()}
              </li>
              <li>
                Last Active:{" "}
                {user?.lastActiveAt &&
                  new Date(user.lastActiveAt).toLocaleString()}
              </li>
              {user?.phoneNumbers && user.phoneNumbers.length > 0 && (
                <li>
                  Phone Numbers:{" "}
                  {user.phoneNumbers
                    .map((phone) => phone.phoneNumber)
                    .join(", ")}
                </li>
              )}
              <li>
                Connected Accounts:{" "}
                {user?.externalAccounts.map((acc) => acc.provider).join(", ")}
              </li>
            </ul>
          </div>
        </section>

        <UserBioSection bio={dbUser?.bio} otherUserProfile={false} />

        <section className="flex flex-col gap-1 md:col-span-2 w-full items-center">
          <div id="Follow Section" className="text-center w-full max-w-2xl">
            <h4 className="text-2xl">Follow Requests</h4>
            {dbUser?.followRequestsReceived &&
            dbUser?.followRequestsReceived.length > 0 ? (
              <ul className="flex flex-wrap justify-center gap-6 border-1 w-full p-2 border-emerald-900 rounded">
                {dbUser?.followRequestsReceived.map((request) => (
                  <FollowRequest key={request.id} userId={request.fromId} />
                ))}
              </ul>
            ) : (
              <p>No follow requests received yet</p>
            )}
          </div>

          <div className="w-full max-w-2xl">
            <h3 className="text-2xl">Followers</h3>
            {dbUser?.followedBy && dbUser?.followedBy.length > 0 ? (
              <ul className="flex flex-wrap justify-center gap-6 border-1 w-full p-2 border-emerald-900 rounded">
                {dbUser?.followedBy.map((follower) => (
                  <UserCard key={follower.id} userData={follower} />
                ))}
              </ul>
            ) : (
              <p>No followers yet</p>
            )}
          </div>

          <div className="w-full max-w-2xl">
            <h3 className="text-2xl">Following</h3>
            {dbUser?.following && dbUser?.following.length > 0 ? (
              <ul className="flex flex-wrap justify-center gap-6 border-1 w-full p-2 border-emerald-900 rounded">
                {dbUser?.following.map((follower) => (
                  <UserCard key={follower.id} userData={follower} />
                ))}
              </ul>
            ) : (
              <p>You are not following anyone yet</p>
            )}
          </div>
        </section>

        <section id="Posts" className="max-w-full md:col-span-2">
          <h5 className="text-2xl mb-2">My Posts</h5>
          {userPosts && userPosts.length > 0 ? (
            <OptimisticPosts
              initialPosts={userPosts}
              currentUserId={dbUser?.id || ""}
              currentUserFirstName={dbUser?.firstName}
              currentUserLastName={dbUser?.lastName}
            />
          ) : (
            <p>You have not written any posts yet</p>
          )}
        </section>
      </div>
    </>
  );
}
