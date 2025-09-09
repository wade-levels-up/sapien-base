"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { createLikeAction } from "@/app/lib/actions";

type LikeButtonProps = {
  postId: string;
};

export default function LikeButton({ postId }: LikeButtonProps) {
  const handleClick = () => {
    createLikeAction(postId);
  };
  return (
    <button onClick={handleClick}>
      <FontAwesomeIcon icon={faThumbsUp} /> Like
    </button>
  );
}
