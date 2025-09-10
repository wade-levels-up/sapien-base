import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchPosts } from "@/app/lib/data";
import Post from "@/app/ui/dashboard/Post";

export default async function NewsFeed() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const posts = await fetchPosts();

  return (
    <div className="flex gap-2 flex-col py-4 h-full w-full">
      <h2 className="w-full text-center">Newsfeed</h2>
      <hr />
      <h3 className="w-full text-center">Posts</h3>
      <ul className="flex items-center gap-4 overflow-x-auto">
        {posts &&
          posts.map((post) => (
            <Post key={post.id} postData={post} userId={userId} />
          ))}
      </ul>
    </div>
  );
}
