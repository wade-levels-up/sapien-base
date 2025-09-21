"use client";

import { deletePostAction } from "@/app/lib/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { startTransition } from "react";

type DeletePostButtonProps = {
  postId: string;
  userId: string;
  setOptimisticPosts: (
    action:
      | { type: "add"; content: string }
      | { type: "delete"; postId: string }
  ) => void;
};

export default function DeletePostButton({
  postId,
  userId,
  setOptimisticPosts,
}: DeletePostButtonProps) {
  async function handleDeletePost() {
    startTransition(() => {
      setOptimisticPosts({ type: "delete", postId });
    });

    try {
      await deletePostAction(postId, userId);
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Unable to delete post");
    }
  }

  return (
    <button onClick={handleDeletePost}>
      <FontAwesomeIcon icon={faX} />
      Delete
    </button>
  );
}
