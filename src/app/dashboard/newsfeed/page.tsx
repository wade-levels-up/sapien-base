import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { fetchPosts } from "@/app/lib/data";
import CreatePostForm from "@/app/ui/dashboard/CreatePostForm";
import Post from "@/app/ui/dashboard/Post";

export default async function NewsFeed() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const posts = await fetchPosts();

  return (
    <div className="flex gap-2 flex-col">
      <h2>Newsfeed</h2>
      <CreatePostForm />
      <ul className="flex flex-wrap">
        {posts && posts.map((post) => <Post key={post.id} postData={post} />)}
      </ul>
    </div>
  );
}
