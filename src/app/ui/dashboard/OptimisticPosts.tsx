"use client";

import { startTransition, useOptimistic, useRef } from "react";
import { createPostAction } from "@/app/lib/actions";
import Post from "@/app/ui/dashboard/Post";
import type { Post as PostType, PostAction } from "@/app/lib/definitions";

type OptimisticPostsProps = {
  initialPosts: PostType[];
  currentUserFirstName?: string | null;
  currentUserLastName?: string | null;
  currentUserId: string;
  includeForm?: boolean;
};

export default function OptimisticPosts({
  initialPosts,
  currentUserFirstName,
  currentUserLastName,
  currentUserId,
  includeForm = false,
}: OptimisticPostsProps) {
  const [optimisticPosts, setOptimisticPosts] = useOptimistic(
    initialPosts,
    (state, action: PostAction) => {
      switch (action.type) {
        case "add":
          return [
            {
              id: `temp-${crypto.randomUUID()}`,
              content: action.content,
              createdAt: new Date(),
              author: {
                id: currentUserId,
                firstName: currentUserFirstName || "You",
                lastName: currentUserLastName || "",
                profilePicturePath: "",
              },
              likes: [],
              comments: [],
            },
            ...state,
          ];

        case "delete":
          return state.filter((post) => post.id !== action.postId);

        case "like":
          return state.map((post) => {
            if (post.id === action.postId) {
              return {
                ...post,
                likes: [...post.likes, { userId: currentUserId }],
              };
            }
            return post;
          });

        case "unlike":
          return state.map((post) => {
            if (post.id === action.postId) {
              return {
                ...post,
                likes: post.likes.filter(
                  (like) => like.userId !== currentUserId
                ),
              };
            }
            return post;
          });

        default:
          return state;
      }
    }
  );

  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const content = formData.get("content") as string;
    if (!content.trim()) return;

    startTransition(() => {
      setOptimisticPosts({ type: "add", content });
    });

    formRef.current?.reset();

    try {
      await createPostAction(content);
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Unable to create post");
    }
  }

  if (!includeForm) {
    return (
      <div className="flex w-full justify-cente">
        <ul
          className={`${
            optimisticPosts.length <= 1
              ? "grid grid-cols-1"
              : "grid grid-cols-2"
          } w-full gap-4 place-items-center`}
        >
          {optimisticPosts.map((post) => (
            <Post
              key={post.id}
              postData={post}
              userId={currentUserId}
              isOptimistic={post.id.startsWith("temp-")}
              setOptimisticPosts={setOptimisticPosts}
            />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <>
      <div className="relative flex flex-col gap-2 md:grid md:grid-cols-2 md:grid-rows-1 md:max-h-100vh">
        <div>
          <h3 className="text-2xl mb-2">Create A New Post</h3>
          <hr />
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
        </div>
        {optimisticPosts.length > 0 ? (
          <section className="h-full">
            <h3 className="w-full text-center text-2xl mb-2">Posts</h3>
            <hr />
            <ul className="flex flex-col no-wrap pb-2 items-center gap-4">
              {optimisticPosts.map((post) => (
                <Post
                  key={post.id}
                  postData={post}
                  userId={currentUserId}
                  isOptimistic={post.id.startsWith("temp-")}
                  setOptimisticPosts={setOptimisticPosts}
                />
              ))}
            </ul>
            <hr />
          </section>
        ) : (
          <section className="w-full pt-8 gap-4 flex flex-col justify-center items-center">
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
    </>
  );
}
