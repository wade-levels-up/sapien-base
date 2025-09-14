import { currentUser } from "@clerk/nextjs/server";
import { fetchUser, fetchUserPosts } from "@/app/lib/data";
import UserBioSection from "@/app/ui/dashboard/UserBioSection";
import Post from "@/app/ui/dashboard/Post";
import Image from "next/image";
import { redirect } from "next/navigation";
import FollowRequest from "@/app/ui/dashboard/FollowRequest";
import UserCard from "@/app/ui/dashboard/UserCard";

export default async function Profile() {
  const user = await currentUser();
  if (!user) redirect("/");
  const dbUser = await fetchUser(user.id);
  const userPosts = await fetchUserPosts(user.id);

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
          <Image
            src={user.imageUrl || "/user.jpg"}
            alt={`${user?.firstName}'s Picture`}
            fill
            sizes="256px"
            className="cover rounded-xl border-2 border-emerald-950"
          />
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

      <UserBioSection bio={dbUser?.bio} otherUserProfile={false} />

      <section id="Follow Requests" className="w-full max-w-2xl">
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
      </section>

      <section id="Followers" className="w-full max-w-2xl">
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
      </section>

      <section id="Following" className="w-full max-w-2xl">
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
      </section>

      <section id="Posts" className="max-w-full">
        <h5 className="text-2xl">My Posts</h5>
        {userPosts && userPosts.length > 0 ? (
          <ul className="flex gap-6 flex-wrap overflow-x-auto">
            {userPosts.map((post) => (
              <Post key={post.id} postData={post} userId={user?.id} />
            ))}
          </ul>
        ) : (
          <p>You have not written any posts yet</p>
        )}
      </section>
    </div>
  );
}
