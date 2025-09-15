import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchRecentUserAndFollowedPosts } from "@/app/lib/data";
import Post from "@/app/ui/dashboard/Post";
import CreatePostForm from "../ui/dashboard/CreatePostForm";

export default async function Dashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  // Fetches posts within the last 7 days from the current user and users they follow
  const posts = await fetchRecentUserAndFollowedPosts();

  return (
    <div className="flex gap-2 flex-col py-4 max-h-full w-full">
      <h2 className="w-full text-center">Dashboard</h2>
      <hr />
      <h3>Create A New Post</h3>
      <section className="flex w-full justify-center">
        <CreatePostForm />
      </section>
      <hr />
      {posts.length > 0 ? (
        <>
          <h3 className="w-full text-center text-2xl">Posts</h3>
          <ul className="flex flex-col no-wrap max-h-full items-center gap-4">
            {posts.map((post) => (
              <Post key={post.id} postData={post} userId={userId} />
            ))}
          </ul>
        </>
      ) : (
        <section className="w-full gap-4 flex flex-col items-center">
          <p>
            This is your dashboard where you can view recent posts within the
            last 7 days from other users as well as your own posts.
          </p>
          <p className="text-emerald-500">
            At the moment there is nothing to view.
          </p>
          <p>
            Create a post or look through other users in the Users section and
            choose people you wish to follow. If those users have posted
            recently their posts will appear here.
          </p>
        </section>
      )}
    </div>
  );
}
