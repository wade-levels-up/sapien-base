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
    <form
      className="border-emerald-500/30 w-full max-w-2xl border rounded-sm p-2 flex flex-col gap-4"
      onSubmit={handleSubmit}
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
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setContent(e.target.value)
        }
        placeholder="Empty your thoughts..."
        rows={4}
      />
      <div className="flex gap-2 justify-between">
        <button type="button" onClick={() => setContent("")}>
          Reset
        </button>
        <button type="submit" disabled={loading}>
          Post
        </button>
      </div>
    </form>
  );
}
