import { fetchUser, fetchUserPosts } from "@/app/lib/data";
import UserBioSection from "@/app/ui/dashboard/UserBioSection";
import Post from "@/app/ui/dashboard/Post";
import Image from "next/image";
import { redirect } from "next/navigation";

type UserProfileProps = {
  params: {
    userId: string;
  };
};

export default async function UserProfile({ params }: UserProfileProps) {
  const { userId } = await params;
  const dbUser = await fetchUser(userId);
  if (!dbUser) redirect("/");
  const userPosts = await fetchUserPosts(userId);

  return (
    <div className="w-full flex flex-col items-center gap-4 py-4">
      <h2>{`${dbUser?.firstName}'s Profile`}</h2>
      <div className="flex gap-4 flex-col md:flex-row items-center">
        <div className="relative w-[192px] h-[192px] md:w-[256px] md:h-[256px]">
          <Image
            src={dbUser.profilePicturePath || "/user.jpg"}
            alt={`${dbUser?.firstName}'s Picture`}
            fill
            sizes="256px"
            className="cover rounded-xl border-2 border-emerald-950"
          />
        </div>
        <ul>
          <li>
            Full Name: {dbUser?.firstName} {dbUser?.lastName}
          </li>
          <li>
            Joined:{" "}
            {dbUser.joined && new Date(dbUser.joined).toLocaleDateString()}
          </li>
        </ul>
      </div>
      <UserBioSection bio={dbUser?.bio} otherUserProfile={true} />
      <section className="max-w-full">
        <h3>{`${dbUser.firstName}'s Posts`}</h3>
        <ul className="flex gap-6 flex-wrap overflow-x-auto">
          {userPosts.map((post) => (
            <Post key={post.id} postData={post} userId={userId} />
          ))}
        </ul>
      </section>
    </div>
  );
}
