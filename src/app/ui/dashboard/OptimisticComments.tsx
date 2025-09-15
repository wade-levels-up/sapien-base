"use client";

import { useOptimistic, useRef, startTransition } from "react";
import { createCommentAction } from "@/app/lib/actions";
import Image from "next/image";

type Comment = {
  id: string;
  content: string;
  author: {
    firstName: string;
    lastName: string;
    profilePicturePath?: string;
  };
};

type OptimisticCommentsProps = {
  postId: string;
  initialComments: Comment[];
  currentUser: {
    id: string;
    firstName: string;
    lastName: string;
    imageUrl?: string;
  };
};

export default function OptimisticComments({
  postId,
  initialComments,
  currentUser,
}: OptimisticCommentsProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    initialComments,
    (state, newComment: string) => [
      {
        id: `temp-${Date.now()}`, // Temporary ID
        content: newComment,
        author: {
          firstName: currentUser.firstName || "You",
          lastName: currentUser.lastName || "",
          profilePicturePath: currentUser.imageUrl,
        },
      },
      ...state, // Add new comment at the top
    ]
  );

  async function handleSubmit(formData: FormData) {
    const content = formData.get("content") as string;
    if (!content.trim()) return;

    // Optimistically add comment
    startTransition(() => {
      addOptimisticComment(content);
    });

    // Clear form immediately
    formRef.current?.reset();

    // Submit to server (no router.refresh needed!)
    try {
      await createCommentAction(postId, content);
    } catch (error) {
      console.error("Failed to create comment:", error);
      // Could add toast notification here
    }
  }

  return (
    <>
      <h4 className="text-2xl py-4">Write Comment</h4>
      <section className="flex justify-center w-full">
        <form ref={formRef} action={handleSubmit} className="w-full max-w-2xl">
          <textarea
            name="content"
            placeholder="Write a comment..."
            className="w-full p-2 border rounded"
            required
            rows={3}
          />
          <div className="w-full flex justify-end">
            <button type="submit">Post Comment</button>
          </div>
        </form>
      </section>

      {optimisticComments.length > 0 && (
        <>
          <h5 className="text-2xl py-4">Comments</h5>
          <section>
            <ul className="flex flex-col items-center w-full gap-4">
              {optimisticComments.map((comment) => (
                <li
                  key={comment.id}
                  className={`flex flex-col items-start bg-emerald-950 w-full max-w-2xl ${
                    comment.id.startsWith("temp-") ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex justify-start gap-3 w-full px-1 items-center p-2">
                    <span className="w-[32px] h-[32px] relative rounded-full">
                      {comment.author.profilePicturePath ? (
                        <Image
                          src={comment.author.profilePicturePath}
                          alt={`${comment.author.firstName} ${comment.author.lastName}`}
                          fill
                          className="object-cover rounded-full"
                          sizes="32px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-400 rounded-full flex items-center justify-center text-xs">
                          {comment.author.firstName.charAt(0)}
                        </div>
                      )}
                    </span>
                    <span>
                      {comment.author.firstName} {comment.author.lastName}
                    </span>
                  </div>
                  <p className="bg-emerald-900 w-full text-left px-1">
                    {comment.content}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </>
  );
}
