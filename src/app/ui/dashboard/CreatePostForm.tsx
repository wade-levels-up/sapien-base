"use client";

import { useState } from "react";
import { createPostAction } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function CreatePostForm() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await createPostAction(content);
      setContent("");
      router.refresh(); // re-fetch server component data
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Unable to create post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setContent(e.target.value)
        }
        placeholder="What's on your mind?"
      />
      <button type="submit" disabled={loading}>
        Post
      </button>
    </form>
  );
}
