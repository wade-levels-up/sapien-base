import { fetchUser, fetchUserPosts } from "@/app/lib/data";
import UserBioSection from "@/app/ui/dashboard/UserBioSection";
import Post from "@/app/ui/dashboard/Post";
import Image from "next/image";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import FollowPane from "@/app/ui/dashboard/FollowPane";
import OptimisticPosts from "@/app/ui/dashboard/OptimisticPosts";

type UserProfileProps = {
  params: {
    userId: string;
  };
};

export default async function UserProfile({ params }: UserProfileProps) {
  // Get data for another user
  const { userId } = await params;
  const otherUser = await fetchUser(userId);
  if (!otherUser) redirect("/");
  const userPosts = await fetchUserPosts(userId);

  // Get data for the user
  const user = await currentUser();
  if (!user) redirect("/");
  const dbUser = await fetchUser(user.id);
  if (!dbUser) redirect("/");

  // Check following states
  const followRequestSent = dbUser.followRequestsSent
    .map((request) => request.toId)
    .includes(otherUser.id);

  const following = dbUser.following
    .map((follower) => follower.id)
    .includes(otherUser.id);

  return (
    <div className="w-full flex flex-col items-center gap-4 py-4">
      {otherUser.firstName ? (
        <h2>{`${otherUser?.firstName}'s Profile`}</h2>
      ) : (
        <h2>Anonymous Profile</h2>
      )}
      <FollowPane
        following={followRequestSent || following}
        userId={otherUser.id}
      />
      <div className="flex gap-4 flex-col md:flex-row items-center">
        <div className="relative w-[192px] h-[192px] md:w-[256px] md:h-[256px]">
          <Image
            priority
            src={otherUser.profilePicturePath || "/user.jpg"}
            alt={`${otherUser?.firstName || "Anonymous"}`}
            fill
            sizes="256px"
            className="cover rounded-xl border-2 border-emerald-950"
          />
        </div>
        <ul>
          <li>
            Full Name: {otherUser?.firstName || "??????"} {otherUser?.lastName}
          </li>
          <li>
            Joined:{" "}
            {otherUser.joined &&
              new Date(otherUser.joined).toLocaleDateString()}
          </li>
        </ul>
      </div>
      <UserBioSection bio={otherUser?.bio} otherUserProfile={true} />
      {userPosts.length > 0 && (
        <section className="max-w-full">
          <h3 className="text-2xl mb-2">{`${
            otherUser.firstName || "Anonymous"
          }'s Posts`}</h3>
          <OptimisticPosts initialPosts={userPosts} currentUserId={user.id} />
        </section>
      )}
    </div>
  );
}
