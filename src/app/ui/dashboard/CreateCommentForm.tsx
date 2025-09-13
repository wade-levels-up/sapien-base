"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCommentAction } from "@/app/lib/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

type CreateCommentFormProps = {
  postId: string;
};

export default function CreateCommentForm({ postId }: CreateCommentFormProps) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await createCommentAction(content, postId);
      setContent("");
      router.refresh(); // re-fetch server component data
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Unable to create comment");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      className="p-2 flex flex-col gap-4 w-full max-w-2xl"
      onSubmit={handleSubmit}
    >
      <label
        className="w-full bg-emerald-950 px-1 rounded-sm"
        htmlFor="content"
      >
        + Create New Comment:
      </label>
      <textarea
        className="px-2 py-2 rounded-lg border-1 border-white/30"
        id="content"
        name="content"
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setContent(e.target.value)
        }
        placeholder="Empty your thoughts..."
        rows={4}
      />
      <div className="flex gap-2 justify-end">
        <button type="submit" disabled={loading}>
          <FontAwesomeIcon icon={faPaperPlane} />
          Post
        </button>
      </div>
    </form>
  );
}
