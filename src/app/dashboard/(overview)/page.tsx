import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchRecentUserAndFollowedPosts } from "@/app/lib/data";
import OptimisticPosts from "../../ui/dashboard/OptimisticPosts";

export default async function Dashboard() {
  const user = await currentUser();
  if (!user) redirect("/");

  // Fetches posts within the last 7 days from the current user and users they follow
  const posts = await fetchRecentUserAndFollowedPosts();

  return (
    <div className="flex gap-2 flex-col py-4 max-h-full w-full">
      <h2 className="w-full text-center">Dashboard</h2>
      <hr />
      <OptimisticPosts
        initialPosts={posts}
        currentUserFirstName={user.firstName}
        currentUserLastName={user.lastName}
        currentUserId={user.id}
        includeForm={true}
      />
    </div>
  );
}
