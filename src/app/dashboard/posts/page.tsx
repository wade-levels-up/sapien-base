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
    <div className="flex gap-2 flex-col py-4">
      <section className="flex flex-col items-center">
        <h2 className="w-full text-left">Newsfeed</h2>
        <CreatePostForm />
      </section>
      <hr />
      <h3>Posts</h3>
      <ul className="flex gap-4 flex-wrap">
        {posts &&
          posts.map((post) => (
            <Post key={post.id} postData={post} userId={userId} />
          ))}
      </ul>
    </div>
  );
}
