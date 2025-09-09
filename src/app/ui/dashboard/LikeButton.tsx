"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faUndo } from "@fortawesome/free-solid-svg-icons";
import { createLikeAction, deleteLikeAction } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

type LikeButtonProps = {
  postId: string;
  userHasLiked: boolean;
};

export default function LikeButton({ postId, userHasLiked }: LikeButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (!userHasLiked) createLikeAction(postId);
    if (userHasLiked) deleteLikeAction(postId);
    router.refresh();
  };

  return (
    <button
      onClick={handleClick}
      title={userHasLiked ? "Already liked" : "Like"}
    >
      <FontAwesomeIcon icon={userHasLiked ? faUndo : faThumbsUp} />
      {userHasLiked ? "Unlike" : "Like"}
    </button>
  );
}
