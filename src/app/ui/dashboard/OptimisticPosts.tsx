"use client";

import { startTransition, useOptimistic, useRef } from "react";
import { createPostAction } from "@/app/lib/actions";
import Post from "@/app/ui/dashboard/Post";
import type { Post as PostType } from "@/app/lib/definitions";

type OptimisticPostsProps = {
  initialPosts: PostType[];
  currentUserFirstName: string | null;
  currentUserId: string;
};

export default function OptimisticPosts({
  initialPosts,
  currentUserFirstName,
  currentUserId,
}: OptimisticPostsProps) {
  const [optimisticPosts, setOptimisticPosts] = useOptimistic(
    initialPosts,
    (state, newContent: string) => [
      {
        id: `temp-${Date.now()}`, // Temporary ID
        content: newContent,
        createdAt: new Date(),
        author: { firstName: currentUserFirstName || "You" },
        likes: [],
        comments: [],
      },
      ...state,
    ]
  );

  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const content = formData.get("content") as string;
    if (!content.trim()) return;

    startTransition(() => {
      setOptimisticPosts(content);
    });

    formRef.current?.reset();

    try {
      await createPostAction(content);
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Unable to create post");
    }
  }

  return (
    <>
      <h3>Create A New Post</h3>
      <section className="flex w-full justify-center">
        <form
          ref={formRef}
          className="border-emerald-500/30 w-full max-w-2xl border rounded-sm p-2 flex flex-col gap-4"
          action={handleSubmit}
        >
          <label
            className="w-full bg-emerald-950 px-1 rounded-sm"
            htmlFor="content"
          >
            Post Content
          </label>
          <textarea
            className="px-2 py-2 rounded-lg border-b-1 border-white/30"
            id="content"
            name="content"
            placeholder="Empty your thoughts..."
            rows={4}
          />
          <div className="flex gap-2 justify-end">
            <button type="submit">Post</button>
          </div>
        </form>
      </section>
      <hr />
      {optimisticPosts.length > 0 ? (
        <>
          <h3 className="w-full text-center text-2xl">Posts</h3>
          <ul className="flex flex-col no-wrap max-h-full items-center gap-4">
            {optimisticPosts.map((post) => (
              <Post
                key={post.id}
                postData={post}
                userId={currentUserId}
                isOptimistic={post.id.startsWith("temp-")}
              />
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
    </>
  );
}
