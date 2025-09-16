"use client";

import { updateBioAction } from "@/app/lib/actions";
import { startTransition, useRef } from "react";

type UpdateBioFormProps = {
  initialContent?: string;
  setUpdating: (value: boolean) => void;
  setOptimisticBio: (action: string) => void;
};

export default function UpdateBioForm({
  initialContent,
  setUpdating,
  setOptimisticBio,
}: UpdateBioFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(formRef.current!);
    const content = formData.get("content") as string;
    if (!content.trim()) return;

    startTransition(() => {
      setOptimisticBio(content);
    });

    formRef.current?.reset();
    setUpdating(false); // ??????

    updateBioAction(content).catch((error) => {
      console.error("Database error:", error);
    });
  }

  return (
    <form
      ref={formRef}
      className="w-full max-w-2xl border-emerald-500/30 border rounded-sm p-2 flex flex-col gap-4"
      onSubmit={handleSubmit} // ??????
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
        placeholder="Tell us about yourself..."
        rows={4}
        defaultValue={initialContent}
      />
      <div className="flex gap-2 justify-end">
        <button type="submit">Save</button>
      </div>
    </form>
  );
}
