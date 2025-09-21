"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faUndo } from "@fortawesome/free-solid-svg-icons";
import { createLikeAction, deleteLikeAction } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import type { PostAction } from "@/app/lib/definitions";

type LikeButtonProps = {
  postId: string;
  userHasLiked: boolean;
  isOptimistic?: boolean;
  setOptimisticPosts?: (action: PostAction) => void;
};

export default function LikeButton({
  postId,
  userHasLiked,
  isOptimistic = false,
  setOptimisticPosts,
}: LikeButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);

    if (!userHasLiked) {
      startTransition(() => {
        setOptimisticPosts?.({ type: "like", postId });
      });

      try {
        await createLikeAction(postId);
      } catch (error) {
        console.error("❌ createLikeAction failed:", error);
      }
    } else {
      startTransition(() => {
        setOptimisticPosts?.({ type: "unlike", postId });
      });

      try {
        await deleteLikeAction(postId);
      } catch (error) {
        console.error("❌ deleteLikeAction failed:", error);
      }
    }

    setLoading(false);
  }

  return (
    <button
      disabled={loading || isOptimistic}
      onClick={handleClick}
      title={userHasLiked ? "Already liked" : "Like"}
    >
      <FontAwesomeIcon icon={userHasLiked ? faUndo : faThumbsUp} />
      {userHasLiked ? "Unlike" : "Like"}
    </button>
  );
}
