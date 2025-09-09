"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faUndo } from "@fortawesome/free-solid-svg-icons";
import { createLikeAction, deleteLikeAction } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LikeButtonProps = {
  postId: string;
  userHasLiked: boolean;
};

export default function LikeButton({ postId, userHasLiked }: LikeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [optimisticLiked, setOptimisticLiked] = useState(userHasLiked);
  const router = useRouter();

  async function handleClick() {
    setLoading(true);
    setOptimisticLiked(!userHasLiked);
    if (!userHasLiked) await createLikeAction(postId);
    if (userHasLiked) await deleteLikeAction(postId);
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      disabled={loading}
      onClick={handleClick}
      title={optimisticLiked ? "Already liked" : "Like"}
    >
      <FontAwesomeIcon icon={optimisticLiked ? faUndo : faThumbsUp} />
      {optimisticLiked ? "Unlike" : "Like"}
    </button>
  );
}
