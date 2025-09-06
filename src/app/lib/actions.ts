"use server";

import { createPost } from "@/app/lib/data";
import { auth } from "@clerk/nextjs/server";

export async function createPostAction(content: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Not authenticated");
  await createPost(userId, content);
}