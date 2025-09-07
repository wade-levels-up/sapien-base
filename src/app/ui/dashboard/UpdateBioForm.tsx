"use client";

import { useState } from "react";
import { updateBioAction } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

type UpdateBioFormProps = {
  prevContent?: string;
  setUpdating: (value: boolean) => void;
};

export default function UpdateBioForm({
  prevContent,
  setUpdating,
}: UpdateBioFormProps) {
  const [content, setContent] = useState(prevContent || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await updateBioAction(content);
      setContent("");
      router.refresh(); // re-fetch server component data
    } catch (error) {
      console.error("Database Error:", error);
      throw new Error("Unable to create post");
    } finally {
      setLoading(false);
      setUpdating(false);
    }
  }

  return (
    <form
      className="w-full max-w-2xl border-emerald-500/30 border rounded-sm p-2 flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <label
        className="flex items-center justify-between p-[6px] w-full bg-emerald-950 rounded-sm"
        htmlFor="content"
      >
        <span>Update Bio:</span>
        <button onClick={() => setUpdating(false)} style={{ border: "none" }}>
          x
        </button>
      </label>

      <textarea
        className="px-2 py-2 rounded-lg border-b-1 border-white/30"
        id="content"
        name="content"
        value={content}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setContent(e.target.value)
        }
        placeholder="Tell us about yourself..."
        rows={4}
      />
      <div className="flex gap-2 justify-between">
        <div className="flex gap-2">
          <button type="button" onClick={() => setContent("")}>
            Clear
          </button>
          {prevContent && (
            <button
              disabled={content === prevContent}
              onClick={(e) => {
                e.preventDefault();
                setContent(prevContent);
              }}
            >
              Undo
            </button>
          )}
        </div>
        <button type="submit" disabled={loading}>
          Save
        </button>
      </div>
    </form>
  );
}
