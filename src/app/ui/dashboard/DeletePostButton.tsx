"use client";

import { deletePostAction } from "@/app/lib/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

type DeletePostButtonProps = {
  postId: string;
  userId: string;
};

export default function DeletePostButton({
  postId,
  userId,
}: DeletePostButtonProps) {
  async function handleDeletePost() {
    await deletePostAction(postId, userId);
  }

  return (
    <button onClick={handleDeletePost}>
      <FontAwesomeIcon icon={faX} />
      Delete
    </button>
  );
}
